"use client";

import { ChangeEventHandler, useState } from "react";
import Input from "./input";
import SearchTags, { SearchTagsProps } from "./SearchTags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Tag from "./tag";
import QuestionModal, { QuestionModalProps } from "./question-modal";
import { addQuestion } from "@/lib/actions";

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

  const handleAddQuestion: QuestionModalProps["onSubmit"] = ({
    text,
    hint,
    tags,
  }) => {
    addQuestion({ name: text, hint, tagIds: tags });
    setIsOpenModal(false);
  };

  const handleChangeCheckbox: ChangeEventHandler<HTMLInputElement> = (e) => {
    const params = new URLSearchParams(searchParams);

    params.set("isPublic", String(!e.target.checked));

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <Input
          type="text"
          placeholder="Название вопроса"
          className="w-1/3 mr-2"
          onChange={handleQuestionNameChange}
          defaultValue={searchParams.get("name")?.toString()}
        />

        <SearchTags className="w-1/3" onSelect={handleTagSelect} />

        <label className="ml-4 flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            onChange={handleChangeCheckbox}
            defaultChecked={searchParams.get("isPublic") === "false"}
          />
          <span className="text-gray-700">Мои вопросы</span>
        </label>

        <button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsOpenModal(true)}
        >
          Добавить вопрос
        </button>

        <QuestionModal
          btnText="Добавить"
          isOpen={isOpenModal}
          onSubmit={handleAddQuestion}
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
