"use client";

import LoadingSpinner from "@/common/components/loading-spinner/loading-spinner";
import Popover from "@/common/components/popover/popover";
import { useEffect, useState } from "react";
import { getSynonyms } from "./_actions/get-synonyms";
import TechDetails from "./_components/tech-details";

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
    <div className="container flex-auto flex flex-col justify-between mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold my-4">Welcome to Synonym Lookup!</h1>
        <div>
          This application allows you to find{" "}
          <Popover
            content={
              <p>
                A synonym is a word, morpheme, or phrase that means precisely or
                nearly the same as another word, morpheme, or phrase in a given
                language. See{" "}
                <a
                  className="text-blue-500 hover:text-blue-600"
                  href="https://en.wikipedia.org/wiki/Synonym"
                  target="_blank"
                >
                  here
                </a>
                &nbsp;for more information.
              </p>
            }
          >
            synonyms
          </Popover>
          &nbsp;for a given word. Enter a word in the input field below to find
          its&apos; synonyms.
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a word to find synonyms"
          className="w-full md:w-1/2 p-2 border rounded my-4"
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
      </div>
      <div>
        <TechDetails
          getSynonymsExecutionTime={getSynonymsExecutionTime}
          lastQueriedSearchTerm={lastQueriedSearchTerm}
        />
      </div>
    </div>
  );
}
