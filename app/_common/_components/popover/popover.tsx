import { useState } from "react";

export default function Popover({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  const showPopover = () => setVisible(true);
  const hidePopover = () => setVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      <span className="font-italic cursor-pointer underline decoration-dotted underline-offset-4 pb-4">
        {children}
      </span>
      {visible && (
        <div
          className="bg-white text-sm absolute left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 rounded shadow-lg z-10 w-64 max-w-xs"
          onMouseEnter={showPopover}
          onMouseLeave={hidePopover}
        >
          {content}
        </div>
      )}
    </div>
  );
}
