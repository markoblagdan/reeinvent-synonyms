// Using this hook for running initilization code for the app since it runs on server start.
export async function register() {
  // Run server side init code.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { globalRef } = await import("./app/globals");
    const { SynonymsRepository } = await import(
      "./common/repositories/synonyms-repository"
    );

    // Initialize global singleton instances
    if (!globalRef.synonymsRepository) {
      globalRef.synonymsRepository = new SynonymsRepository();
    }

    // Seed synonyms data
    await globalRef.synonymsRepository.seedSynonyms();
  }
}
