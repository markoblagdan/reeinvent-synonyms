import { useState, useEffect } from "react";
import { getTotalNumberOfSynonyms } from "../actions/get-total-number-synonyms";
import Message from "@/common/components/message/message";

export default function TotalNumberOfSynonyms() {
  const [totalNumberOfSynonyms, setTotalNumberOfSynonyms] = useState<
    number | null
  >(null);
  const [
    errorFetchingTotalNumberOfSynonyms,
    setErrorFetchingTotalNumberOfSynonyms,
  ] = useState(false);

  useEffect(() => {
    const fetchTotalSynonyms = async () => {
      try {
        const totalNumberOfSynonyms = await getTotalNumberOfSynonyms();
        setTotalNumberOfSynonyms(totalNumberOfSynonyms);
        setErrorFetchingTotalNumberOfSynonyms(false);
      } catch {
        setErrorFetchingTotalNumberOfSynonyms(true);
      }
    };

    fetchTotalSynonyms();
  }, []);

  return (
    <>
      {!errorFetchingTotalNumberOfSynonyms && totalNumberOfSynonyms && (
        <div>
          <p className="mt-4 text-sm text-gray-800">
            Total number of synonyms in database:&nbsp;
            <span>{totalNumberOfSynonyms}</span>
          </p>
        </div>
      )}
      {errorFetchingTotalNumberOfSynonyms && (
        <Message
          widthCssClass="max-w-sm"
          type="error"
          message="Error fetching total number of synonyms"
        />
      )}
    </>
  );
}
