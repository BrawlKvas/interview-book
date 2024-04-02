"use client";

import { ChangeEventHandler, useState } from "react";
import Input from "./input";
import SearchTags from "./SearchTags";
import CreateQuestionModal from "./create-question-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function QuestionFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [isOpenModal, setIsOpenModal] = useState(false);

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

  return (
    <div className="flex mb-4">
      <Input
        type="text"
        placeholder="Поиск по тексту вопроса"
        className="w-1/3 mr-2"
        onChange={handleQuestionNameChange}
      />
      <SearchTags className="w-1/3" />

      <button
        className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpenModal(true)}
      >
        Добавить вопрос
      </button>

      <CreateQuestionModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
}
