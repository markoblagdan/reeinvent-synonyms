"use server";

import { functionExecutionTimeWrapper } from "@/app/_common/_utils/execution_time_wrapper";
import { globalRef } from "@/app/globals";

export async function getSynonyms(word: string) {
  const getSynonymsResult = functionExecutionTimeWrapper(
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
