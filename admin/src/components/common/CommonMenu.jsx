import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CommonMenu({ label, icon: Icon, path, children }) {
  const [open, setOpen] = useState(false);
  const hasChildren = React.Children.count(children) > 0;

  if (!hasChildren && path) {
    return (
      <Link
        to={path}
        className="flex items-center gap-3 rounded px-3 py-2 hover:bg-gray-100"
      >
        {Icon && <Icon className="h-5 w-5 text-gray-500" />}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded px-3 py-2 hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5 text-gray-500" />}
          <span>{label}</span>
        </div>
        {hasChildren &&
          (open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ))}
      </button>

      {hasChildren && open && (
        <div className="mt-1 ml-6 space-y-1">{children}</div>
      )}
    </div>
  );
}
