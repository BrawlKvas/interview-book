import { MouseEventHandler, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import XMarkIcon from "./icons/x-mark";

export type ModalProps = PropsWithChildren<{
  title?: string;
  isOpen?: boolean;
  onClose?: VoidFunction;
}>;

export default function Modal({
  title,
  isOpen,
  children,
  onClose,
}: ModalProps) {
  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) {
    return null;
  }

  const element = (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 m-2 max-w-2xl w-full shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(element, document.body);
}
