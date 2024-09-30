"use server";

import { globalRef } from "@/app/globals";

/**
 * Server action for fetching the total number of synonyms from the data layer.
 * @returns {Promise<number>} The total number of synonyms.
 */
export async function getTotalNumberOfSynonyms() {
  return globalRef.synonymsRepository.getTotalNumberOfSynonyms();
}
