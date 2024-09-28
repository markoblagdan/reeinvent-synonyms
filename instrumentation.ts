// Using this hook for running initilization code for the app since it runs on server start.
export async function register() {
  // Run server side init code.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { globalRef } = await import("./app/globals");
    const { SynonymsRepository } = await import(
      "./app/_common/_repositories/synonyms-repository"
    );

    // Initialize singleton instances
    if (!globalRef.synonymsRepository) {
      globalRef.synonymsRepository = new SynonymsRepository();
    }
  }
}
