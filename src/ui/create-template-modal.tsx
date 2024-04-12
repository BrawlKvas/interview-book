import dynamic from "next/dynamic";
import Input from "./input";
import { FormEventHandler } from "react";
import { addTemplate } from "@/lib/actions";

const Modal = dynamic(() => import("./modal"), { ssr: false });

export type CreateTemplateModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
};

export default function CreateTemplateModal({
  isOpen,
  onClose,
}: CreateTemplateModalProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    addTemplate(e.currentTarget.newTemplateName.value);
  };

  return (
    <Modal title="Создание шаблона" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <label htmlFor="newTemplateName">
          Введите название нового шаблона:
        </label>
        <Input
          id="newTemplateName"
          name="newTemplateName"
          required={true}
          placeholder="Название шаблона"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Создать
        </button>
      </form>
    </Modal>
  );
}
