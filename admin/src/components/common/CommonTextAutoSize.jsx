import React, { useRef, useEffect } from "react";

export default function CommonTextAutoSize({
  value = "",
  onChange,
  placeholder = "",
  className = "",
  minRows = 4,
  maxRows = 6,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height =
      Math.min(textarea.scrollHeight, maxRows * 24) + "px";
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      rows={minRows}
      className={`resize-none rounded-lg border border-gray-400 px-3 py-2 ${className}`}
    />
  );
}
