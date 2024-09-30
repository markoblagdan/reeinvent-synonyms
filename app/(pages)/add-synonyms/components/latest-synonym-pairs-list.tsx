import Message from "@/common/components/message/message";
import { useEffect, useState } from "react";
import { getLatestSynonymPairs } from "../actions/get-latest-synonym-pairs";
import SynonymPairEntry from "./synonym-pair-entry";
import { synonymsAppConfig } from "@/config";

export default function LatestSynonymPairsList({
  latestSynonymPairsFromAddSynonymCall,
}: {
  latestSynonymPairsFromAddSynonymCall: [string, string][] | undefined;
}) {
  const [latestSynonymPairs, setLatestSynonymPairs] = useState<
    [string, string][] | undefined
  >(undefined);
  const [errorFetchingSynonymPairs, setErrorFetchingSynonymPairs] =
    useState(false);
  const [errorDeletingSynonymPair, setErrorDeletingSynonymPair] = useState<
    string | null
  >(null);
  const [deleteSynonymsExecutionTime, setDeleteSynonymsExecutionTime] =
    useState<number | null>(null);

  useEffect(() => {
    const fetchLatestSynonymPairs = async () => {
      const numberOfPairsToShow = 5;

      try {
        setLatestSynonymPairs(await getLatestSynonymPairs(numberOfPairsToShow));
      } catch {
        setErrorFetchingSynonymPairs(true);
      }
    };

    fetchLatestSynonymPairs();
  }, []);

  useEffect(() => {
    if (latestSynonymPairsFromAddSynonymCall) {
      setLatestSynonymPairs(latestSynonymPairsFromAddSynonymCall);
    }
  }, [latestSynonymPairsFromAddSynonymCall]);

  return (
    <div className="md:w-1/4 w-full bg-white p-8 shadow-lg rounded-lg flex flex-col">
      <div className="flex-auto">
        <h2>Latest Synonym Pairs:</h2>
        {latestSynonymPairs && latestSynonymPairs.length > 0 && (
          <ul>
            {latestSynonymPairs.map((pair, index) => (
              <li key={index}>
                <SynonymPairEntry
                  word={pair[0]}
                  synonym={pair[1]}
                  setErrorDeleting={setErrorDeletingSynonymPair}
                  setDeleteSynonymsExecutionTime={
                    setDeleteSynonymsExecutionTime
                  }
                  setLatestSynonymPairs={setLatestSynonymPairs}
                />
              </li>
            ))}
          </ul>
        )}
        {latestSynonymPairs &&
          latestSynonymPairs.length === 0 &&
          !errorFetchingSynonymPairs && (
            <p className="text-gray-500 italic mt-4">
              No synonyms were added yet.
            </p>
          )}
        {errorFetchingSynonymPairs && (
          <Message
            type="error"
            message="Error fetching latest synonym pairs. Try adding synonyms or refreshing the page."
          />
        )}
        {errorDeletingSynonymPair && (
          <Message type="error" message={errorDeletingSynonymPair} />
        )}
      </div>
      <div className="flex-initial">
        {deleteSynonymsExecutionTime && (
          <p className="text-sm">
            Deleting synonyms took{" "}
            {deleteSynonymsExecutionTime?.toFixed(
              synonymsAppConfig.numberOfDecimalPlacesToShowForExecutionTime
            )}
            &nbsp;milliseconds
          </p>
        )}

        {latestSynonymPairs && latestSynonymPairs.length > 0 && (
          <Message
            type="info"
            message={
              <>
                <b>Note</b>: Deleting synonyms using this list does not undo the
                add operation - it removes both the word and the synonym from
                the data completely.
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
