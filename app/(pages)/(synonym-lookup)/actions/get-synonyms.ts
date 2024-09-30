"use server";

import { functionExecutionTimeWrapper } from "@/common/utils/execution_time_wrapper";
import { globalRef } from "@/app/globals";

/**
 * Server action for fetching synonyms for a given word from the data layer.
 * @param {string} word - The word to fetch synonyms for.
 * @returns {Promise<FunctionExecutionTimeWrapperResult<Set<string>>>} An object containing the list of synonyms if available and the execution time.
 */
export async function getSynonyms(word: string) {
  const getSynonymsResult = await functionExecutionTimeWrapper(
    globalRef.synonymsRepository.getSynonyms.bind(
      globalRef.synonymsRepository,
      word
    )
  );

  return {
    result: getSynonymsResult.result
      ? Array.from(getSynonymsResult.result)
      : [],
    executionTime: getSynonymsResult.executionTime,
  };
}
