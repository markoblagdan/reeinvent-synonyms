"use server";

import { globalRef } from "@/app/globals";

/**
 * Server action for fetching the latest added synonym pairs from the data layer.
 * @param {number} numberOfPairs - The number of synonym pairs to fetch.
 * @returns {Promise<string[]>} An array of the latest synonym pairs or an empty array if none are found.
 */
export async function getLatestSynonymPairs(numberOfPairs: number) {
  const synonymPairs =
    globalRef.synonymsRepository.getLatestSynonymPairs(numberOfPairs);

  return synonymPairs;
}
