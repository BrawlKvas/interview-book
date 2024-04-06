import React from "react";
import PencilIcon from "@/ui/icons/pencil";
import TrashIcon from "@/ui/icons/trash";

export default function Page() {
  return (
    <>
      <input
        type="text"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:border-blue-400"
        placeholder="Название шаблона"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TemplateCard title="Шаблон 1" />
        <TemplateCard title="Шаблон с длинным названием, которое может занимать несколько строк" />
        <TemplateCard title="Шаблон 3" />
      </div>
    </>
  );
}

function TemplateCard({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-md shadow-md p-6 flex items-start">
      <h2 className="text-lg font-semibold flex-grow">{title}</h2>
      <div className="ml-3 shrink-0">
        <button className="text-blue-500 hover:text-blue-700">
          <PencilIcon />
        </button>
        <button className="text-red-500 hover:text-red-700 ml-2">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
