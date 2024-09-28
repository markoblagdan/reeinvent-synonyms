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
  const firstSynonym = formData.get("firstSynonym") as string;
  const secondSynonym = formData.get("secondSynonym") as string;

  const synonymErrors = validateSynonymInput(firstSynonym, secondSynonym);

  if (synonymErrors.firstSynonymError || synonymErrors.secondSynonymError) {
    return <AddSynonymFormState>{ synonymErrors };
  }

  const addSynonymsResult = functionExecutionTimeWrapper(
    globalRef.synonymsRepository.addSynonymPair.bind(
      globalRef.synonymsRepository,
      firstSynonym,
      secondSynonym
    ),
    "addSynonyms"
  );

  const latestSynonymPairs =
    globalRef.synonymsRepository.getLatestSynonymPairs(5);

  return <AddSynonymFormState>{
    successMessage: `Synonym pair: "${firstSynonym}" - "${secondSynonym}" added successfully`,
    latestSynonymPairs,
    addSynonymsExecutionTime: addSynonymsResult.executionTime,
  };
}

const validateSynonymInput = (
  firstSynonym: string,
  secondSynonym: string
): AddSynonymsInputErrors => {
  const synonymErrors: AddSynonymsInputErrors = {
    firstSynonymError: "",
    secondSynonymError: "",
    generalError: "",
  };

  if (!firstSynonym) {
    synonymErrors.firstSynonymError = "First synonym is required";
  }

  if (!secondSynonym) {
    synonymErrors.secondSynonymError = "Second synonym is required";
  } else if (firstSynonym === secondSynonym) {
    synonymErrors.secondSynonymError =
      "Second synonym must be different from first synonym";
  }

  return synonymErrors;
};
