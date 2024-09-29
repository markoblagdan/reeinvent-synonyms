"use server";

import { globalRef } from "@/app/globals";
import {
  AddSynonymFormState,
  AddSynonymsInputErrors,
} from "../_types/add-synonym-types";
import { functionExecutionTimeWrapper } from "@/app/_common/_utils/execution_time_wrapper";

export async function addSynonyms(
  _: AddSynonymFormState,
  formData: FormData
): Promise<AddSynonymFormState> {
  const word = formData.get("word") as string;
  const synonym = formData.get("synonym") as string;

  const synonymErrors = validateSynonymInput(word, synonym);

  if (synonymErrors.wordError || synonymErrors.synonymError) {
    return <AddSynonymFormState>{ inputErrors: synonymErrors };
  }

  const addSynonymsResult = functionExecutionTimeWrapper(
    globalRef.synonymsRepository.addSynonymPair.bind(
      globalRef.synonymsRepository,
      word,
      synonym
    ),
    "addSynonyms"
  );

  const latestSynonymPairs =
    globalRef.synonymsRepository.getLatestSynonymPairs(5);

  return <AddSynonymFormState>{
    successMessage: `Synonym pair: "${word}" - "${synonym}" added successfully`,
    latestSynonymPairs,
    addSynonymsExecutionTime: addSynonymsResult.executionTime,
  };
}

const validateSynonymInput = (
  firstSynonym: string,
  secondSynonym: string
): AddSynonymsInputErrors => {
  const inputErrors: AddSynonymsInputErrors = {
    wordError: "",
    synonymError: "",
  };

  if (!firstSynonym) {
    inputErrors.wordError = "Word is required!";
  }

  if (!secondSynonym) {
    inputErrors.synonymError = "Synonym is required!";
  } else if (firstSynonym === secondSynonym) {
    inputErrors.synonymError = "Word and synonym must be different.";
  }

  return inputErrors;
};
