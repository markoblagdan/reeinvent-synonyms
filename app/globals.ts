import { SynonymsRepository } from "./_common/_repositories/synonyms-repository";

export const globalRef = global as typeof globalThis & {
  synonymsRepository: SynonymsRepository;
};

if (!globalRef.synonymsRepository) {
  globalRef.synonymsRepository = new SynonymsRepository();
}
