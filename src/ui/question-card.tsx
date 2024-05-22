import clsx from "clsx";
import TrashIcon from "./icons/trash";
import Tag from "./tag";
import { MouseEventHandler } from "react";

export type QuestionCardProps = {
  text: string;
  hint?: string;
  tags?: string[];
  className?: string;
  onClick?: VoidFunction;
  onDelete?: VoidFunction;
};

export default function QuestionCard({
  text,
  hint,
  tags,
  className,
  onClick,
  onDelete,
}: QuestionCardProps) {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-md p-5 flex flex-col",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="text-lg font-semibold">{text}</div>
        {onDelete && (
          <button
            className="text-red-500 hover:text-red-700 ml-2"
            onClick={handleDelete}
          >
            <TrashIcon className="pointer-events-none" />
          </button>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>
      {hint && (
        <details className="mt-2" onClick={(e) => e.stopPropagation()}>
          <summary>Вспомогающая информация</summary>
          <p className="mt-2">{hint}</p>
        </details>
      )}
    </div>
  );
}
