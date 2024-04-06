"use client"; //TODO Удалить

import React from "react";
import TemplateCard from "@/ui/template-card";

export default function Page() {
  return (
    <>
      <input
        type="text"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full shadow-sm focus:outline-none focus:border-blue-400"
        placeholder="Название шаблона"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TemplateCard name="Junior Frontend" onDelete={() => {}} />
        <TemplateCard
          name="Шаблон с длинным названием, которое может занимать несколько строк"
          onDelete={() => {}}
        />
        <TemplateCard
          name="Java developer"
          onClick={() => {}}
          onDelete={() => {}}
        />
        <TemplateCard
          name="C++ middle"
          onClick={() => {}}
          onDelete={() => {}}
        />
      </div>
    </>
  );
}
