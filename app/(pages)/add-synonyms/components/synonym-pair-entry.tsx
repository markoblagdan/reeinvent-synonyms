import LoadingSpinner from "@/common/components/loading-spinner/loading-spinner";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { deleteSynonyms } from "../actions/delete-synonyms";

export default function SynonymPairEntry({
  word,
  synonym,
  setErrorDeleting,
  setLatestSynonymPairs,
  setDeleteSynonymsExecutionTime,
}: {
  word: string;
  synonym: string;
  setErrorDeleting: Dispatch<SetStateAction<string | null>>;
  setLatestSynonymPairs: Dispatch<
    SetStateAction<[string, string][] | undefined>
  >;
  setDeleteSynonymsExecutionTime: Dispatch<SetStateAction<number | null>>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const updatedLatestSynonymPairs = await deleteSynonyms(word, synonym);
      setLatestSynonymPairs(updatedLatestSynonymPairs.result);
      setDeleteSynonymsExecutionTime(updatedLatestSynonymPairs.executionTime);
      setErrorDeleting(null);
    } catch {
      setErrorDeleting(
        `Failed deleting synonym pair ${word} - ${synonym}. It might be due to internal server errors or network connection issues, try refreshing the page and deleting again.`
      );
      setDeleteSynonymsExecutionTime(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex w-full my-2">
        <div className="flex-grow">
          <span className="font-bold">{word}</span> -{" "}
          <span className="font-bold">{synonym}</span>
        </div>
        {isDeleting && <LoadingSpinner />}
        {!isDeleting && (
          <Image
            onClick={() => handleDelete()}
            className="inline cursor-pointer hover:opacity-80"
            src="/images/red-trash-icon.png"
            height={24}
            width={24}
            alt="Delete synonym pair"
          />
        )}
      </div>
    </>
  );
}
