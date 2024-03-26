import XMarkIcon from "./icons/x-mark";

export type TagProps = {
  text: string;
  onDelete?: VoidFunction;
};

export default function Tag({ text, onDelete }: TagProps) {
  return (
    <span className="inline-flex gap-1 align-center bg-blue-100 text-blue-500 px-2 py-1 rounded-full">
      {text}

      {onDelete && (
        <button className="hover:text-blue-600" onClick={onDelete}>
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </span>
  );
}
