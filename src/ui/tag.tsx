import XMarkIcon from "./icons/x-mark";

const COLOR_STYLES = {
  blue: "bg-blue-100 text-blue-500",
  green: "bg-green-100 text-green-500",
  gray: "bg-gray-100 text-gray-500",
} as const;

export type TagProps = {
  text: string;
  color?: "blue" | "green" | "gray";
  onDelete?: VoidFunction;
};

export default function Tag({ text, color = "blue", onDelete }: TagProps) {
  return (
    <span
      className={`inline-flex gap-1 align-center ${COLOR_STYLES[color]} px-2 py-1 rounded-full whitespace-nowrap`}
    >
      {text}

      {onDelete && (
        <button className="hover:text-blue-600" onClick={onDelete}>
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </span>
  );
}
