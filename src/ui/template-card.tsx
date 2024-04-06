"use client";

import { MouseEventHandler } from "react";
import TrashIcon from "./icons/trash";
import clsx from "clsx";

export type TemplateCardProps = {
  name: string;
  onClick?: VoidFunction;
  onDelete?: VoidFunction;
};

export default function TemplateCard({
  name,
  onClick,
  onDelete,
}: TemplateCardProps) {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-md shadow-md p-6 flex items-start",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow"
      )}
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold flex-grow">{name}</h2>
      <div className="ml-3 shrink-0">
        {onDelete && (
          <button
            className="text-red-500 hover:text-red-700 ml-2"
            onClick={handleDelete}
          >
            <TrashIcon />
          </button>
        )}
      </div>
    </div>
  );
}
