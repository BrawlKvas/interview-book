import clsx from "clsx";
import { MouseEventHandler } from "react";
import TrashIcon from "./icons/trash";
import { InterviewStatus } from "@/lib/types";
import Tag from "./tag";

export type InterviewCardProps = {
  candidateFIO: string;
  date: string;
  status: InterviewStatus;
  onClick?: VoidFunction;
  onDelete?: VoidFunction;
};

const STATUS_COLORS = {
  [InterviewStatus.Scheduled]: "gray",
  [InterviewStatus.InProgress]: "blue",
  [InterviewStatus.Completed]: "green",
} as const;

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
      <Tag text={status} color={STATUS_COLORS[status]} />
      <div className="text-gray-600 mt-2 mb-2">
        {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
}
