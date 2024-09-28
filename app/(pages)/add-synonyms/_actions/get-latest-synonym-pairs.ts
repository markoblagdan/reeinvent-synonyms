"use server";

import { globalRef } from "@/app/globals";

export async function getLatestSynonymPairs(numberOfPairs: number) {
  const synonymPairs =
    globalRef.synonymsRepository.getLatestSynonymPairs(numberOfPairs);

  return synonymPairs ?? [];
}
