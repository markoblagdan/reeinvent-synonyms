import { synonymsAppConfig } from "@/config";
import TotalNumberOfSynonyms from "./total-number-of-synonyms";

export default function TechDetails({
  getSynonymsExecutionTime,
  lastQueriedSearchTerm,
}: {
  getSynonymsExecutionTime: number | null;
  lastQueriedSearchTerm: string;
}) {
  return (
    <div>
      {getSynonymsExecutionTime && (
        <p className="mt-4 text-sm text-gray-800">
          It took&nbsp;
          <span className="italic">
            {getSynonymsExecutionTime.toFixed(
              synonymsAppConfig.numberOfDecimalPlacesToShowForExecutionTime
            )}
            &nbsp;milliseconds
          </span>
          &nbsp;to find synonyms for &ldquo;{lastQueriedSearchTerm}&rdquo;.
        </p>
      )}
      <TotalNumberOfSynonyms />
      <p className="mt-4 text-sm">
        The initial dataset was sourced from the Kaggle platform{" "}
        <a
          href="https://www.kaggle.com/datasets/duketemon/wordnet-synonyms"
          target="_blank"
          className="text-blue-500 hover:text-blue-600"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}
