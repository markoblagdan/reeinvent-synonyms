import LoadingSpinner from "@/common/components/loading-spinner/loading-spinner";
import { useFormStatus } from "react-dom";

export default function FormLoadingState({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-center mt-4">
      {pending && (
        <>
          <LoadingSpinner />
          <span className="ml-2">{text}</span>
        </>
      )}
    </div>
  );
}
