"use client";

import { TemplateDTO, deleteTemplate } from "@/lib/actions";
import Input from "./input";
import TemplateCard from "./template-card";
import CreateTemplateModal from "./create-template-modal";
import { ChangeEventHandler, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmptyPlate from "./empty-plate";
import ConfirmationModal from "./confirmation-modal";

export type TemplatesListProps = {
  templates: TemplateDTO[];
};

export default function TemplatesList({ templates }: TemplatesListProps) {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);

  const handleQuestionNameChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeCheckbox: ChangeEventHandler<HTMLInputElement> = (e) => {
    const params = new URLSearchParams(searchParams);

    params.set("isPublic", String(e.target.checked));

    replace(`${pathname}?${params.toString()}`);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
    setCurrentTemplate(null);
  };

  const handleConfirm = async () => {
    handleCancel();

    if (currentTemplate) {
      await deleteTemplate(currentTemplate);
    }
  };

  const handleDelete = (id: string) => {
    setCurrentTemplate(id);
    setConfirmModalOpen(true);
  };

  return (
    <>
      <div className="flex mb-4">
        <Input
          className="w-1/3"
          placeholder="Название шаблона"
          defaultValue={searchParams.get("name")?.toString()}
          onChange={handleQuestionNameChange}
        />

        <label className="ml-4 flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            onChange={handleChangeCheckbox}
            defaultChecked={searchParams.get("isPublic") === "true"}
          />
          <span className="text-gray-700">Публичные</span>
        </label>

        <button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsOpen(true)}
        >
          Добавить шаблон
        </button>
      </div>

      {templates.length === 0 && <EmptyPlate />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            name={template.name}
            onDelete={() => handleDelete(template.id)}
            onClick={() => push(`/templates/${template.id}`)}
            key={template.id}
          />
        ))}
      </div>

      <CreateTemplateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Удалить шаблон?"
        message="Вы уверены, что хотите удалить этот шаблон? Это повлечет за собой удаление всех интервью связанных с этим шаблоном"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
