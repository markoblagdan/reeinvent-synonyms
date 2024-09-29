"use client";

import Message from "@/common/components/message/message";
import { useFormState } from "react-dom";
import FormLoadingState from "../../../common/components/form-loading-state/form-loading-state";
import { addSynonyms } from "./_actions/add-synonyms";
import LatestSynonymPairsList from "./_components/latest-synonym-pairs-list";
import SynonymInput from "./_components/synonym-input";
import { AddSynonymFormState } from "./_types/add-synonym-types";
import { synonymsAppConfig } from "@/config";

const initialState: AddSynonymFormState = {
  inputErrors: {
    wordError: "",
    synonymError: "",
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add Synonyms
          </h1>
          <p>
            Add a word and its synonym to our database via the input fields
            below. Entries are case sensitive.
          </p>
        </div>
        <SynonymInput
          id="word"
          label="Word"
          placeholder="Enter a word, e.g. sreća"
          errorMessage={state.inputErrors?.wordError}
        />
        <SynonymInput
          id="synonym"
          label="Synonym"
          placeholder="Enter a synonym, e.g. radost"
          errorMessage={state.inputErrors?.synonymError}
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
            Adding synonyms took&nbsp;
            {state.addSynonymsExecutionTime.toFixed(
              synonymsAppConfig.numberOfDecimalPlacesToShowForExecutionTime
            )}
            &nbsp;milliseconds
          </p>
        )}
      </form>
      <LatestSynonymPairsList latestSynonymPairs={state.latestSynonymPairs} />
    </div>
  );
}
