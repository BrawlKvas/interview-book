"use client";

import { ChangeEventHandler, useState } from "react";
import Input from "./input";
import SearchTags, { SearchTagsProps } from "./SearchTags";
import CreateQuestionModal from "./create-question-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Tag from "./tag";

type QuestionFiltersProps = {
  selectedTags: { id: number; name: string }[];
};

export default function QuestionFilters({
  selectedTags,
}: QuestionFiltersProps) {
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

  const handleTagSelect: SearchTagsProps["onSelect"] = (tagId) => {
    const params = new URLSearchParams(searchParams);

    const tags = params.get("tags")?.split(",") || [];

    if (!tags.includes(String(tagId))) {
      tags.push(String(tagId));
    }

    params.set("tags", tags.join(","));

    replace(`${pathname}?${params.toString()}`);
  };

  const handleDeleteTag = (tagId: number) => {
    const params = new URLSearchParams(searchParams);

    const tags = (params.get("tags")?.split(",") || []).filter(
      (tag) => +tag !== tagId
    );

    if (tags.length) {
      params.set("tags", tags.join(","));
    } else {
      params.delete("tags");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <Input
          type="text"
          placeholder="Поиск по тексту вопроса"
          className="w-1/3 mr-2"
          onChange={handleQuestionNameChange}
        />
        <SearchTags className="w-1/3" onSelect={handleTagSelect} />

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

      <div className="mt-2 space-x-2">
        {selectedTags.map((tag) => (
          <Tag
            text={tag.name}
            key={tag.id}
            onDelete={() => handleDeleteTag(tag.id)}
          />
        ))}
      </div>
    </div>
  );
}
