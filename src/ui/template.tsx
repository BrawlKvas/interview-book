"use client";

import {
  TemplateQuestionDTO,
  TemplateWithQuestionsDTO,
  getTemplateById,
  updateTemplateQuestionsOrder,
} from "@/lib/actions";
import PlusIcon from "./icons/plus";
import { useEffect, useState } from "react";
import { isRequestError } from "@/lib/utils";
import TemplateQuestions from "./template-questions";
import { SortEndHandler } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

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

    await updateTemplateQuestionsOrder(template.id, movedQuestions.map(q => q.id));

    setIsValid(false);
  };

  return (
    <div className="space-y-4">
      <button className="w-full h-14 flex justify-center items-center text-slate-400 duration-150 border-2 border-dashed border-slate-300 hover:text-slate-300  hover:border-slate-200">
        <PlusIcon />
      </button>

      <TemplateQuestions questions={questions} onSortEnd={handleSortEnd} />
    </div>
  );
}
