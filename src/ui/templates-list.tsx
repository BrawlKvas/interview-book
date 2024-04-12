"use client";

import { TemplateDTO, deleteTemplate } from "@/lib/actions";
import Input from "./input";
import TemplateCard from "./template-card";
import CreateTemplateModal from "./create-template-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type TemplatesListProps = {
  templates: TemplateDTO[];
};

export default function TemplatesList({ templates }: TemplatesListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { push } = useRouter();

  return (
    <>
      <div className="flex">
        <Input className="w-1/3" placeholder="Название шаблона" />

        <button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsOpen(true)}
        >
          Добавить шаблон
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            name={template.name}
            onDelete={() => deleteTemplate(template.id)}
            onClick={() => push(`/templates/${template.id}`)}
            key={template.id}
          />
        ))}
      </div>

      <CreateTemplateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
