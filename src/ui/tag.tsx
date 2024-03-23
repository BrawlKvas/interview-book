export type TagProps = {
  text: string;
};

export default function Tag({ text }: TagProps) {
  return (
    <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full">
      {text}
    </span>
  );
}
