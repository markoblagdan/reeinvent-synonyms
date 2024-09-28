"use server";

import { globalRef } from "@/app/globals";

export async function getTotalNumberOfSynonyms() {
  return globalRef.synonymsRepository.getTotalNumberOfSynonyms();
}
