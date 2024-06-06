"use client";

import { useRouter } from "next/navigation";
import InterviewCard from "./interview-card";
import routes from "@/constants/routes";
import { InterviewDTO } from "@/lib/actions";
import { useState } from "react";

export type InterviewsListProps = {
  interviews: Omit<InterviewDTO, "result" | "isResultPublished">[];
};

export default function InterviewsList({ interviews }: InterviewsListProps) {
  const { push } = useRouter();
  const [isComparisonMode, setComparisonMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggleComparisonMode = () => {
    setComparisonMode((prev) => !prev);
    setSelected([]);
  };

  const handleStartComparison = () => {
    if (selected.length === 2) {
      push(`${routes.interviewsComparison}?ids=${selected.join(",")}`);
    }
  };

  const handleSelect = (id: string) => {
    if (selected.length < 2 && !selected.includes(id)) {
      setSelected((prev) => [...prev, id]);
    } else if (selected.includes(id)) {
      setSelected((prev) => prev.filter((v) => v !== id));
    }
  };

  const handleToInterview = (id: string) => {
    push(routes.interviews + "/" + id);
  };

  const handleClick = isComparisonMode ? handleSelect : handleToInterview;

  return (
    <>
      <div className="mb-4 flex justify-end gap-4 items-center">
        {isComparisonMode && <span>Выбрано: {selected.length} из 2</span>}

        {isComparisonMode && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleStartComparison}
          >
            Перейти к сравнению
          </button>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleToggleComparisonMode}
        >
          {isComparisonMode ? "Выйти из сравнения" : "Сравнить результаты"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {interviews.map((interview) => (
          <InterviewCard
            candidateFIO={`${interview.candidate?.surname} ${interview.candidate?.name}`}
            templateName={interview.template.name}
            date={interview.date}
            status={interview.status}
            selected={selected.includes(interview.id)}
            key={interview.id}
            onClick={() => handleClick(interview.id)}
          />
        ))}
      </div>
    </>
  );
}
