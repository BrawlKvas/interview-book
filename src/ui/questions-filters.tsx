// TODO Убрать этот компонент
// Временный компонент для разработки
"use client";

import dynamic from "next/dynamic";
import Tag from "./tag";
import { useState } from "react";

const Modal = dynamic(() => import("./modal"), { ssr: false });

export default function QuestionsFilters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Поиск по тексту вопроса"
        className="w-1/3 p-2 mr-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Поиск по тегу вопроса"
        className="w-1/3 p-2 border border-gray-300 rounded"
      />
      <button
        className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Добавить вопрос
      </button>
      <Modal
        isOpen={isOpen}
        title="Добавить новый вопрос"
        onClose={() => setIsOpen(false)}
      >
        <div>
          <label htmlFor="questionText" className="block mb-2">
            Текст вопроса:
          </label>
          <textarea
            id="questionText"
            className="w-full border rounded-md p-2"
          />
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
            <Tag text="React" />
            <Tag text="JavaScript" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Добавить
          </button>
        </div>
      </Modal>
    </div>
  );
}
