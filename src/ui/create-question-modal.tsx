import dynamic from "next/dynamic";
import Tag from "./tag";

const Modal = dynamic(() => import("./modal"), { ssr: false });

export type CreateQuestionModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
};

export default function CreateQuestionModal({
  isOpen,
  onClose,
}: CreateQuestionModalProps) {
  return (
    <Modal isOpen={isOpen} title="Добавить новый вопрос" onClose={onClose}>
      <div>
        <label htmlFor="questionText" className="block mb-2">
          Текст вопроса:
        </label>
        <textarea id="questionText" className="w-full border rounded-md p-2" />
      </div>
      <div className="mt-4">
        <label htmlFor="tagSearch" className="block mb-2">
          Поиск тегов:
        </label>
        <input
          type="text"
          id="tagSearch"
          className="w-full border rounded-md p-2"
        />
        <div className="mt-4 flex gap-2">
          <Tag text="React" onDelete={() => console.log("DELETE")} />
          <Tag text="JavaScript" />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Добавить
        </button>
      </div>
    </Modal>
  );
}
