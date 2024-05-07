"use client";

import {
  TemplateQuestionDTO,
  TemplateWithQuestionsDTO,
  addTemplateQuestions,
  deleteTemplateQuestion,
  getTemplateById,
  updateTemplateQuestionsOrder,
} from "@/lib/actions";
import PlusIcon from "./icons/plus";
import { useEffect, useState } from "react";
import { isRequestError } from "@/lib/utils";
import TemplateQuestions from "./template-questions";
import { SortEndHandler } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import AddQuestionTemplateModal, {
  AddQuestionTemplateModalProps,
} from "./add-question-template-modal";

export type TemplateProps = {
  initTemplateData: TemplateWithQuestionsDTO;
};

const getQuestionsInOrder = ({
  order,
  questions,
}: Pick<TemplateWithQuestionsDTO, "order" | "questions">) => {
  return order
    .map((id) => questions.find((q) => q.id === id))
    .filter(Boolean) as TemplateQuestionDTO[];
};

export default function Template({ initTemplateData }: TemplateProps) {
  const [template, setTemplate] = useState(initTemplateData);
  const [isValid, setIsValid] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [questions, setQuestions] = useState<TemplateQuestionDTO[]>(() =>
    getQuestionsInOrder(initTemplateData)
  );

  useEffect(() => {
    let flag = true;

    async function fetchData() {
      const temp = await getTemplateById(template.id);

      if (!flag) return;

      setIsValid(true);

      if (isRequestError(temp)) return;

      setTemplate(temp);
      setQuestions(getQuestionsInOrder(temp));
    }

    if (!isValid) {
      fetchData();
    }

    return () => {
      flag = false;
    };
  }, [template.id, isValid]);

  const handleSortEnd: SortEndHandler = async ({ oldIndex, newIndex }) => {
    const movedQuestions = arrayMoveImmutable(questions, oldIndex, newIndex);

    setQuestions(movedQuestions);

    await updateTemplateQuestionsOrder(
      template.id,
      movedQuestions.map((q) => q.id)
    );

    setIsValid(false);
  };

  const handleAddQuestions: AddQuestionTemplateModalProps["onAddQuestions"] =
    async (ids) => {
      const res = await addTemplateQuestions(template.id, ids);

      if (!res.some(isRequestError)) {
        await updateTemplateQuestionsOrder(template.id, [
          ...questions.map((q) => q.id),
          ...(res as string[]),
        ]);
      }

      setIsValid(false);
    };

  const handleQuestionDelete = async (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));

    await deleteTemplateQuestion(id);
    setIsValid(false);
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center">
        <span className="text-gray-600">Название шаблона:</span>
        <input
          className="w-1/2 ml-4 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          defaultValue={initTemplateData.name}
        />
      </label>

      <label className="flex items-center">
        <span className="text-gray-600">Публичный шаблон:</span>
        <input
          type="checkbox"
          className="ml-4 form-checkbox text-indigo-600 h-5 w-5"
          checked={initTemplateData.isPublic}
        />
      </label>

      <button
        className="w-full h-14 flex justify-center items-center text-slate-400 duration-150 border-2 border-dashed border-slate-300 hover:text-slate-300  hover:border-slate-200"
        onClick={() => setIsOpenModal(true)}
      >
        <PlusIcon />
      </button>

      <TemplateQuestions
        questions={questions}
        onSortEnd={handleSortEnd}
        onDelete={handleQuestionDelete}
      />

      <AddQuestionTemplateModal
        isOpen={isOpenModal}
        onAddQuestions={handleAddQuestions}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
}
