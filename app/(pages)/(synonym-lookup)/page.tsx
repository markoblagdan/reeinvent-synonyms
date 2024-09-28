"use client";

import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/app/_common/_components/loading-spinner/loading-spinner";
import { getSynonyms } from "./_actions/get-synonyms";
import TotalNumberOfSynonyms from "./_components/total-number-of-synonyms";

export default function SynonymLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastQueriedSearchTerm, setLastQueriedSearchTerm] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getSynonymsExecutionTime, setGetSynonymsExecutionTime] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchSynonyms = async () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm === "") {
        return;
      }

      setIsLoading(true);

      try {
        const { executionTime, result: termSynonyms } = await getSynonyms(
          trimmedSearchTerm
        );

        setGetSynonymsExecutionTime(executionTime);
        setSynonyms(termSynonyms);
      } catch {
        setSynonyms([]);
        setGetSynonymsExecutionTime(null);
      } finally {
        setIsLoading(false);
        setLastQueriedSearchTerm(trimmedSearchTerm);
      }
    };

    const debounceTimer = setTimeout(fetchSynonyms, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Synonym Lookup</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter a word to find synonyms"
        className="w-full p-2 border rounded mb-4"
      />
      {isLoading && (
        <div className="flex items-center gap-2">
          <LoadingSpinner /> Searching...
        </div>
      )}
      {!isLoading && synonyms && synonyms.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Synonyms:</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {synonyms.map((synonym, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {synonym}
              </span>
            ))}
          </div>
        </div>
      )}
      {!isLoading &&
        lastQueriedSearchTerm &&
        synonyms &&
        synonyms.length === 0 && (
          <p className="mt-4 font-italic text-gray-800">
            No synonyms found for &ldquo;{lastQueriedSearchTerm}
            &rdquo;.
          </p>
        )}
      {getSynonymsExecutionTime && (
        <p className="mt-4 text-sm text-gray-800">
          It took&nbsp;
          <span className="font-bold">
            {getSynonymsExecutionTime} milliseconds
          </span>
          &nbsp;to find synonyms for &ldquo;{lastQueriedSearchTerm}&rdquo;.
        </p>
      )}
      <TotalNumberOfSynonyms />
    </div>
  );
}
