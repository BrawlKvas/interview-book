import clsx from "clsx";
import TrashIcon from "./icons/trash";
import { MouseEventHandler } from "react";

export type CandidateCardProps = {
  name: string;
  surname: string;
  grade: string;
  specialty: string;
  experience: string;
  onClick?: VoidFunction;
  onDelete?: VoidFunction;
};

const CandidateCard = ({
  name,
  surname,
  grade,
  specialty,
  experience,
  onClick,
  onDelete,
}: CandidateCardProps) => {
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
        <div className="font-semibold text-lg">
          {name} {surname}
        </div>
        {onDelete && (
          <button
            className="text-red-500 hover:text-red-700 ml-2"
            onClick={handleDelete}
          >
            <TrashIcon />
          </button>
        )}
      </div>
      <div className="text-gray-600 mb-2">{specialty}</div>
      <div className="text-gray-600 mb-2">{grade}</div>
      <div className="text-gray-600 mb-4">{experience}</div>
    </div>
  );
};

export default CandidateCard;
