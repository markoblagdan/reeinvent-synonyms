import path from "path";
import { promises as fs } from "fs";

/**
 * Repository class for seeding, getting, adding and deleting synonyms.
 * @class
 */
export class SynonymsRepository {
  synonyms: Map<string, Set<string>> = new Map<string, Set<string>>();
  latestSynonymPairs: [string, string][] | undefined;

  private readonly seedDataFilePath = "data/synonyms.csv";

  /**
   * Retrieves synonyms for a given word.
   * @param {string} word - The word to find synonyms for.
   * @returns {Set<string> | undefined} A set of synonyms if found, undefined otherwise.
   */
  getSynonyms = (word: string): Set<string> | undefined => {
    return this.synonyms.get(word);
  };

  /**
   * Adds a pair of synonyms to the repository.
   * @param {string} firstWord - The first word of the synonym pair.
   * @param {string} secondWord - The second word of the synonym pair.
   * @returns {void}
   */
  addSynonymPair(firstWord: string, secondWord: string): void {
    const firstWordSynonymSet = this.synonyms.get(firstWord) || new Set();
    const secondWordSynonymSet = this.synonyms.get(secondWord) || new Set();

    // Create a set where synonyms of both words are added, start by adding the words themselves
    const allSynonyms = new Set<string>();
    allSynonyms.add(firstWord);
    allSynonyms.add(secondWord);

    // Add the other synonyms to the set of all synonyms for both words.
    // Set.prototype.union or using spread operator on Set is not available in ES5,
    // so we need to use forEach to update the allSynonyms set
    firstWordSynonymSet.forEach((word) => allSynonyms.add(word));
    secondWordSynonymSet.forEach((word) => allSynonyms.add(word));

    // Update the synonym sets for each found synonym with the new set of all synonyms
    allSynonyms.forEach((word) => {
      // Clone the set to avoid referencingthe original set
      const allSynonymsClone = new Set(allSynonyms);

      // Remove the key word from the cloned set
      allSynonymsClone.delete(word);

      this.synonyms.set(word, allSynonymsClone);
    });

    // Update the list of latest synonym pairs
    this.addLatestSynonymPair(firstWord, secondWord);
  }

  /**
   * Retrieves the latest added synonym pairs.
   * @param {number} numberOfPairs - The number of latest pairs to retrieve.
   * @returns {[string, string][] | undefined} An array of synonym pairs or undefined.
   */
  getLatestSynonymPairs(numberOfPairs: number): [string, string][] | undefined {
    return this.latestSynonymPairs?.slice(0, numberOfPairs);
  }

  /**
   * Gets the total number of synonyms available to the repository.
   * @returns {number} The total count of synonyms.
   */
  getTotalNumberOfSynonyms(): number {
    return this.synonyms.size;
  }

  /**
   * Deletes both the word and the synonym completely from the data layer.
   * @param {string} word - The word to delete.
   * @param {string} synonym - The synonym to delete.
   * @returns {[string, string][] | undefined} The latest synonym pairs after deletion.
   */
  deleteSynonyms(
    word: string,
    synonym: string
  ): [string, string][] | undefined {
    const wordSynonymSet = this.synonyms.get(word);

    // First we check if the word exists and if it contains the synonym
    if (!wordSynonymSet) {
      throw new Error("Word not found, nothing to delete.");
    }

    if (!wordSynonymSet.has(synonym)) {
      throw new Error(
        "Provided word and synyonym are not valid pairs, cancelling operation."
      );
    }

    // Remove both the word and the synonym from the sets of the word's other synonyms
    wordSynonymSet.forEach((wordSynonym) => {
      const synonymSet = this.synonyms.get(wordSynonym)!;

      synonymSet.delete(word);
      synonymSet.delete(synonym);
    });

    // Delete the sets of the word and the synonym
    this.synonyms.delete(word);
    this.synonyms.delete(synonym);

    // Filter out any pairs that contain the word or synonym
    this.latestSynonymPairs = this.latestSynonymPairs?.filter(
      (synonymPair) =>
        !synonymPair.some(
          (synonymPairWord) =>
            synonymPairWord === word || synonymPairWord === synonym
        )
    );

    return this.latestSynonymPairs;
  }

  /**
   * Seeds the repository with initial synonym data.
   * Currently data is read from a CSV file. The provided file lists synonyms by word and by type, e.g. verb or noun.
   * Since our current implementation does not support synonyms by type, we will treat all synonyms as belonging to one type.
   * This means that for words which can be both a verb or noun (e.g. "yield") we will retrieve synonyms from both types.
   * The idea is to test execution time with a larger set of data.
   * @returns {Promise<void>} A promise that resolves when seeding is complete.
   */
  async seedSynonyms(): Promise<void> {
    const filePath = path.join(process.cwd(), this.seedDataFilePath);

    let data;

    try {
      console.info("Reading synonyms CSV file...");
      data = await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.error("Error reading synonyms file:", error);
      return;
    }

    const lines = data.split("\n");

    lines.forEach((line) => {
      // Skip empty lines
      if (!line.trim()) return;

      // Split by commas: [word, type, group1|group2|group3...]
      const [word, , groupsString] = line.split(",");

      // Skip if line is malformed
      if (!word || !groupsString) return;

      const groups = groupsString.split("|");

      // Collect all synonyms from all groups in one Set
      const allSynonyms = new Set<string>();

      groups.forEach((group) => {
        // Split each group by ";" to get the synonyms
        group.split(";").forEach((synonym) => {
          if (synonym.trim()) {
            allSynonyms.add(synonym.trim());
          }
        });
      });

      // Add the main word to the synonyms set, if it's not already present
      allSynonyms.add(word);

      // Update the map for each synonym
      allSynonyms.forEach((synonym) => {
        if (!this.synonyms.has(synonym)) {
          this.synonyms.set(synonym, new Set());
        }

        const synonymSet = this.synonyms.get(synonym)!;

        // Add all synonyms from the set (excluding itself)
        allSynonyms.forEach((s) => {
          if (s !== synonym) {
            synonymSet.add(s);
          }
        });
      });
    });

    console.info("Synonyms CSV processed.");
  }

  private addLatestSynonymPair(firstWord: string, secondWord: string): void {
    if (!this.latestSynonymPairs) {
      this.latestSynonymPairs = [[firstWord, secondWord]];
    } else {
      const numberOfLatestSynonymPairs = this.latestSynonymPairs.unshift([
        firstWord,
        secondWord,
      ]);
      if (numberOfLatestSynonymPairs > 100) {
        this.latestSynonymPairs.pop();
      }
    }
  }
}
