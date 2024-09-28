"use client";

import Message from "@/app/_common/_components/message/message";
import { useFormState } from "react-dom";
import FormLoadingState from "../../_common/_components/form-loading-state/form-loading-state";
import { addSynonyms } from "./_actions/add-synonyms";
import LatestSynonymPairsList from "./_components/latest-synonym-pairs-list";
import SynonymInput from "./_components/synonym-input";
import { AddSynonymFormState } from "./_types/add-synonym-types";

const initialState: AddSynonymFormState = {
  synonymErrors: {
    firstSynonymError: "",
    secondSynonymError: "",
  },
  successMessage: "",
  latestSynonymPairs: [],
  addSynonymsExecutionTime: null,
};

export default function AddSynonyms() {
  const [state, formAction] = useFormState(addSynonyms, initialState);

  return (
    <div className="container mx-auto py-10 flex flex-wrap gap-10 justify-center px-4">
      <form
        action={formAction}
        className="md:w-1/3 w-full bg-white p-8 shadow-lg rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Enter Synonym Pair
        </h1>
        <SynonymInput
          id="firstSynonym"
          label="First Synonym"
          errorMessage={state.synonymErrors?.firstSynonymError}
        />
        <SynonymInput
          id="secondSynonym"
          label="Second Synonym"
          errorMessage={state.synonymErrors?.secondSynonymError}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>
        {state.successMessage && (
          <Message type="success" message={state.successMessage} />
        )}
        <FormLoadingState text="Submitting..." />
        {state.addSynonymsExecutionTime && (
          <p className="text-sm text-gray-800">
            Adding synonyms took:
            <span className="font-bold">
              {state.addSynonymsExecutionTime} milliseconds
            </span>
          </p>
        )}
      </form>
      <LatestSynonymPairsList latestSynonymPairs={state.latestSynonymPairs} />
    </div>
  );
}
