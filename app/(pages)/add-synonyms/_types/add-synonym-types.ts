export type AddSynonymsInputErrors = {
  firstSynonymError: string;
  secondSynonymError: string;
};

export type AddSynonymFormState = {
  synonymErrors?: AddSynonymsInputErrors;
  successMessage?: string;
  latestSynonymPairs?: string[][];
  addSynonymsExecutionTime?: number | null;
};
