"use client";

import { QuestionDTO, TagDTO, getQuestions, getTagById } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import QuestionCard from "./question-card";
import Input from "./input";
import SearchTags, { SearchTagsProps } from "./SearchTags";
import Tag from "./tag";

const Modal = dynamic(() => import("./modal"), { ssr: false });

export type AddQuestionTemplateModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
  onAddQuestions?: (ids: number[]) => void;
};

export default function AddQuestionTemplateModal({
  isOpen,
  onAddQuestions,
  onClose,
}: AddQuestionTemplateModalProps) {
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const [filterName, setFilterName] = useState("");
  const [filterTags, setFilterTags] = useState<TagDTO[]>([]);
  const [filterIsPublic, setFilterIsPublic] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const tags = filterTags.map((tag) => tag.id).join(",");

      const res = await getQuestions({
        name: filterName,
        ...(tags ? { tags } : {}),
        isPublic: String(filterIsPublic),
      });

      if (!isRequestError(res)) {
        setQuestions(res);
      }
    }

    fetchData();
  }, [filterName, filterTags, filterIsPublic]);

  const handleSelectTag: SearchTagsProps["onSelect"] = async (id) => {
    if (filterTags.some((tag) => tag.id === id)) return;

    const res = await getTagById(id);

    if (isRequestError(res)) return;

    setFilterTags((prev) => [...prev, res]);
  };

  const handleDeleteTag = (id: number) => {
    setFilterTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleSelectQuestion = (id: number) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions((prev) => prev.filter((v) => v !== id));
    } else {
      setSelectedQuestions((prev) => [...prev, id]);
    }
  };

  const handleSubmit = () => {
    onAddQuestions?.(selectedQuestions);
    onClose?.();

    setFilterName("");
    setFilterTags([]);
    setSelectedQuestions([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Добавление вопросов в шаблон"
      size="wide"
      className="!bg-gray-100"
      onClose={onClose}
    >
      <div className="flex justify-between items-center">
        <span>Выбрано: {selectedQuestions.length}</span>

        <button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Добавить
        </button>
      </div>

      <div className="mt-2 mb-2 flex">
        <Input
          placeholder="Название вопроса"
          className="mr-4 w-1/3"
          onChange={(e) => setFilterName(e.target.value)}
        />

        <SearchTags className="w-1/3" onSelect={handleSelectTag} />

        <label className="ml-4 flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            onChange={(e) => setFilterIsPublic(e.target.checked)}
          />
          <span className="text-gray-700">Публичные вопросы</span>
        </label>
      </div>

      {filterTags.length !== 0 && (
        <div className="flex gap-2 mb-2">
          {filterTags.map((tag) => (
            <Tag
              text={tag.name}
              key={tag.id}
              onDelete={() => handleDeleteTag(tag.id)}
            />
          ))}
        </div>
      )}

      <div className="h-96 overflow-y-auto space-y-2">
        {questions.map((question) => (
          <QuestionCard
            text={question.name}
            tags={question.tags.map((t) => t.name)}
            key={question.id}
            className={`border-2 ${
              selectedQuestions.includes(question.id)
                ? "border-blue-400"
                : "border-transparent"
            }`}
            onClick={() => handleSelectQuestion(question.id)}
          />
        ))}
      </div>
    </Modal>
  );
}
