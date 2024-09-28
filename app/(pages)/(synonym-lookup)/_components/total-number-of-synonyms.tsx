import { useState, useEffect } from "react";
import { getTotalNumberOfSynonyms } from "../_actions/get-total-number-synonyms";
import Message from "@/app/_common/_components/message/message";

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
      } catch (error) {
        setErrorFetchingTotalNumberOfSynonyms(true);
      }
    };

    fetchTotalSynonyms();
  }, []);

  return (
    <>
      {totalNumberOfSynonyms && (
        <div>
          <p className="mt-4 text-lg font-semibold text-gray-800">
            Total number of synonyms in database:&nbsp;
            <span className="text-indigo-800">{totalNumberOfSynonyms}</span>
          </p>
        </div>
      )}
      {errorFetchingTotalNumberOfSynonyms && (
        <Message
          type="error"
          message="Error fetching total number of synonyms"
        />
      )}
    </>
  );
}
