export type EmptyPlateProps = {
  title?: string;
};

export default function EmptyPlate({ title }: EmptyPlateProps) {
  return (
    <div className="h-60 flex items-center justify-center border-4 border-dashed text-gray-500">
      {title || "Пусто"}
    </div>
  );
}
