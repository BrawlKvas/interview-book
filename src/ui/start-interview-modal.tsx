import dynamic from "next/dynamic";
import Autocomplete from "./autocomplete";

const Modal = dynamic(() => import("./modal"), { ssr: false });

type StartInterviewModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
};

export default function StartInterviewModal({
  isOpen,
  onClose,
}: StartInterviewModalProps) {
  return (
    <Modal title="Новое интервью" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <label className="flex items-center">
          <span className="w-24 text-gray-600">Дата:</span>
          <input
            type="datetime-local"
            className="w-1/2 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="flex items-center">
          <span className="w-24 text-gray-600">Кандидат:</span>
          <Autocomplete
            type="search"
            placeholder="ФИО кандидата"
            options={[]}
            className="flex-1"
          />
        </label>

        <label className="flex items-center">
          <span className="w-24 text-gray-600">Шаблон:</span>
          <Autocomplete
            type="search"
            placeholder="Название шаблона"
            options={[]}
            className="flex-1"
          />
        </label>
      </div>

      <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Начать интервью
      </button>
    </Modal>
  );
}
