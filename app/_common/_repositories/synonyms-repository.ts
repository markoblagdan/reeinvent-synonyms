import path from "path";
import { promises as fs } from "fs";

export class SynonymsRepository {
  synonyms: Map<string, Set<string>> = new Map<string, Set<string>>();
  latestSynonymPairs: [string, string][] | undefined;

  getSynonyms = (word: string): Set<string> | undefined => {
    return this.synonyms.get(word);
  };

  addSynonymPair(firstWord: string, secondWord: string): void {
    const firstWordSynonymSet = this.synonyms.get(firstWord) || new Set();
    const secondWordSynonymSet = this.synonyms.get(secondWord) || new Set();

    // Create a set where synonyms of both words are added, start by adding the words themselves
    const allSynonyms = new Set<string>();
    allSynonyms.add(firstWord);
    allSynonyms.add(secondWord);

    // Add the other synonyms to the set of all synonyms for both words. Set.prototype.union or using spread operator on Set is not available in ES5, so we need to use forEach to update the allSynonyms set
    firstWordSynonymSet.forEach((word) => allSynonyms.add(word));
    secondWordSynonymSet.forEach((word) => allSynonyms.add(word));

    allSynonyms.forEach((word) => {
      const allSynonymsClone = new Set(allSynonyms);

      // Remove the key word from the cloned set
      allSynonymsClone.delete(word);

      this.synonyms.set(word, allSynonymsClone);
    });

    // Update the list of latest synonym pairs
    this.addLatestSynonymPair(firstWord, secondWord);
  }

  getLatestSynonymPairs(numberOfPairs: number): [string, string][] | undefined {
    return this.latestSynonymPairs?.slice(0, numberOfPairs);
  }

  getTotalNumberOfSynonyms(): number {
    return this.synonyms.size;
  }

  // deleteSynonymPair(firstWord: string, secondWord: string): void {
  // Implementation to be added
  // }

  async seedSynonyms(): Promise<void> {
    /* 
      Read the synonyms data from the CSV file. The provided file lists synonyms by word and by type, e.g. verb or noun.
      Since our current implementation does not support synonyms by type, we will treat all synonyms as belonging to one type.
      This means that for words which can be both a verb or noun (e.g. "yield") we will retrieve synonyms from both types.
      The idea is to test execution time with a larger set of data. 
    */
    const filePath = path.join(process.cwd(), "data", "synonyms.csv");

    let data;

    try {
      data = await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.error("Error reading synonyms file:", error);
      return;
    }

    const lines = data.split("\n");

    console.info("Processing synonyms CSV...");
    console.info(lines.slice(0, 100));

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
