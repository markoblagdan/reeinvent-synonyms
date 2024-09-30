import { useEffect, useState } from "react";
import { getLatestSynonymPairs } from "../actions/get-latest-synonym-pairs";
import Message from "@/common/components/message/message";

export default function LatestSynonymPairsList({
  latestSynonymPairs,
}: {
  latestSynonymPairs: string[][] | undefined;
}) {
  const [initialLatestSynonymPairs, setInitialLatestSynonymPairs] = useState<
    string[][]
  >([]);
  const [initialSynonymPairsFetched, setInitialSynonymPairsFetched] =
    useState(false);
  const [
    errorFetchingInitialSynonymPairs,
    setErrorFetchingInitialSynonymPairs,
  ] = useState(false);

  useEffect(() => {
    const fetchLatestSynonymPairs = async () => {
      let fetchedLatestSynonymPairs: string[][] = [];
      const numberOfPairsToShow = 5;

      try {
        fetchedLatestSynonymPairs = await getLatestSynonymPairs(
          numberOfPairsToShow
        );
      } catch {
        setErrorFetchingInitialSynonymPairs(true);
      }

      if (fetchedLatestSynonymPairs) {
        setInitialLatestSynonymPairs(fetchedLatestSynonymPairs);
        setInitialSynonymPairsFetched(true);
      }
    };

    fetchLatestSynonymPairs();
  }, []);

  const synonymPairsToShow =
    latestSynonymPairs && latestSynonymPairs.length > 0
      ? latestSynonymPairs
      : initialLatestSynonymPairs;

  return (
    <>
      <div className="md:w-1/4 w-full bg-white p-8 shadow-lg rounded-lg">
        <h2>Latest Synonym Pairs:</h2>
        {synonymPairsToShow.length > 0 && (
          <ul>
            {synonymPairsToShow.map((pair, index) => (
              <li key={index}>
                <span className="font-bold">{pair[0]}</span> -{" "}
                <span className="font-bold">{pair[1]}</span>
              </li>
            ))}
          </ul>
        )}
        {initialSynonymPairsFetched &&
          synonymPairsToShow.length === 0 &&
          !errorFetchingInitialSynonymPairs && (
            <p className="text-gray-500 italic mt-4">
              No synonyms were added yet.
            </p>
          )}
        {errorFetchingInitialSynonymPairs && (
          <Message
            type="error"
            message="Error fetching latest synonym pairs. Try adding synonyms or refreshing the page."
          />
        )}
      </div>
    </>
  );
}
