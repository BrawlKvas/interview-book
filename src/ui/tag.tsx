import XMarkIcon from "./icons/x-mark";

export type TagProps = {
  text: string;
  color?: 'blue' | 'green' | 'gray';
  onDelete?: VoidFunction;
};

export default function Tag({ text, color = 'blue', onDelete }: TagProps) {
  return (
    <span className={`inline-flex gap-1 align-center bg-${color}-100 text-${color}-500 px-2 py-1 rounded-full`}>
      {text}

      {onDelete && (
        <button className="hover:text-blue-600" onClick={onDelete}>
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </span>
  );
}
