import clsx from "clsx";
import { MouseEventHandler } from "react";
import TrashIcon from "./icons/trash";

export type InterviewCardProps = {
  candidateFIO: string;
  date: string;
  status: string;
  onClick?: VoidFunction;
  onDelete?: VoidFunction;
};

export default function InterviewCard({
  candidateFIO,
  date,
  status,
  onClick,
  onDelete,
}: InterviewCardProps) {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-md p-5",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-lg">{candidateFIO}</div>
        {onDelete && (
          <button
            className="text-red-500 hover:text-red-700 ml-2"
            onClick={handleDelete}
          >
            <TrashIcon />
          </button>
        )}
      </div>
      <div className="text-gray-600 mb-2">{status}</div>
      <div className="text-gray-600 mb-2">
        {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
}
