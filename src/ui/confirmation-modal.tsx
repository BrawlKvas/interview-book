import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./modal"), { ssr: false });

export type ConfirmationModal = {
  title?: string;
  message?: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function ConfirmationModal({
  title = "Подтвердите действие",
  message,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmationModal) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2 className="text-xl font-semibold -mt-4 mb-2">{title}</h2>
      {message && <p className="text-gray-700 mb-6">{message}</p>}
      <div className="flex space-x-4">
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Подтвердить
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Отменить
        </button>
      </div>
    </Modal>
  );
}
