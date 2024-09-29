"use server";

import { globalRef } from "@/app/globals";
import {
  AddSynonymFormState,
  AddSynonymsInputErrors,
} from "../_types/add-synonym-types";
import { functionExecutionTimeWrapper } from "@/common/utils/execution_time_wrapper";

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
  word: string,
  synonym: string
): AddSynonymsInputErrors => {
  const inputErrors: AddSynonymsInputErrors = {
    wordError: "",
    synonymError: "",
  };

  // TODO: Find a regex or better validation that will match all letters and numbers in any language.
  const alphaNumericWithCroatianLettersRegex = /[^a-zA-Z0-9ćĆčČžŽđĐ]/;

  if (!word) {
    inputErrors.wordError = "Word is required!";
  } else if (word.match(alphaNumericWithCroatianLettersRegex)) {
    inputErrors.wordError = "Word can contain only letters and numbers.";
  }

  if (!synonym) {
    inputErrors.synonymError = "Synonym is required!";
  } else if (synonym.match(alphaNumericWithCroatianLettersRegex)) {
    inputErrors.synonymError = "Synonym can contain only letters and numbers.";
  } else if (word === synonym) {
    inputErrors.synonymError = "Word and synonym must be different.";
  }

  return inputErrors;
};
