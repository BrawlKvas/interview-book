"use client";

import PlusIcon from "@/ui/icons/plus";
import QuestionCard from "@/ui/question-card";

export default function Page({ params }: { params: { templateId: string } }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-700">
          Шаблон - &quot;Junior Frontent&quot;
        </h1>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Сохранить
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <button className="w-full h-14 flex justify-center items-center text-slate-400 duration-150 border-2 border-dashed border-slate-300 hover:text-slate-300  hover:border-slate-200">
          <PlusIcon />
        </button>
        <QuestionCard text="Сколько стоит литр сока?" onDelete={() => {}} />
        <QuestionCard
          text="Расскажи про свой самый большой секрет"
          onDelete={() => {}}
        />
        <QuestionCard
          text="В чем разница между var и let? Что вы знаете про всплытие?"
          onDelete={() => {}}
        />
      </div>
    </>
  );
}
