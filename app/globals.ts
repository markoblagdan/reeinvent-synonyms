import { SynonymsRepository } from "../common/repositories/synonyms-repository";

export const globalRef = global as typeof globalThis & {
  synonymsRepository: SynonymsRepository;
};
