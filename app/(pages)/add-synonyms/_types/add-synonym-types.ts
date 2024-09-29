export type AddSynonymsInputErrors = {
  wordError: string;
  synonymError: string;
};

export type AddSynonymFormState = {
  inputErrors?: AddSynonymsInputErrors;
  successMessage?: string;
  latestSynonymPairs?: string[][];
  addSynonymsExecutionTime?: number | null;
};
