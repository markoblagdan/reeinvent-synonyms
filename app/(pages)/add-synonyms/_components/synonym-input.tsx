import Message from "@/app/_common/_components/message/message";

export default function SynonymInput({
  id,
  label,
  errorMessage,
}: {
  id: string;
  label: string;
  errorMessage: string | undefined;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      {errorMessage && <Message type="error" message={errorMessage} />}
    </div>
  );
}
