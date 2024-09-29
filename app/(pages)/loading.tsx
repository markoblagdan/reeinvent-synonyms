import LoadingSpinner from "@/common/components/loading-spinner/loading-spinner";

export default function Loading() {
  return (
    <div className="flex-auto flex justify-center items-center pb-52">
      <LoadingSpinner size="large" />
    </div>
  );
}
