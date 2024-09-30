"use server";

import { globalRef } from "@/app/globals";
import { FunctionExecutionTimeWrapper } from "@/common/types/execution_time_wrapper";
import { functionExecutionTimeWrapper } from "@/common/utils/execution_time_wrapper";

/**
 * Deletes both the word and the synonym from the database.
 * @param word - The word to delete.
 * @param synonym - The synonym to delete.
 * @returns The latest synonym pairs after deletion.
 */
export async function deleteSynonyms(
  word: string,
  synonym: string
): Promise<FunctionExecutionTimeWrapper<[string, string][] | undefined>> {
  try {
    return await functionExecutionTimeWrapper(
      globalRef.synonymsRepository.deleteSynonyms.bind(
        globalRef.synonymsRepository,
        word,
        synonym
      )
    );
  } catch (error) {
    throw error;
  }
}
