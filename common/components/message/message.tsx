import React from "react";

type MessageProps = {
  type: "success" | "error" | "info";
  message: string | React.ReactNode;
  widthCssClass?: "max-w-sm" | "max-w-md" | "max-w-lg";
};

export default function Message({
  type,
  message,
  widthCssClass,
}: MessageProps) {
  if (type === "error") {
    return (
      <div
        className={
          "mt-2 p-2 bg-red-100 border border-red-600 rounded-md " +
          (widthCssClass ?? "")
        }
      >
        <p className="text-red-700 text-sm">{message}</p>
      </div>
    );
  }

  if (type === "success") {
    return (
      <div
        className={
          "mt-2 p-2 bg-green-100 border border-green-600 rounded-md " +
          (widthCssClass ?? "")
        }
      >
        <p className="text-green-700 text-sm text-center">{message}</p>
      </div>
    );
  }

  if (type === "info") {
    return (
      <div
        className={
          "mt-2 p-2 bg-blue-100 border border-blue-600 rounded-md " +
          (widthCssClass ?? "")
        }
      >
        <p className="text-blue-700 text-sm">{message}</p>
      </div>
    );
  }

  return null;
}
