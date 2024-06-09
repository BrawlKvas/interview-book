"use client";

import clsx from "clsx";
import QuestionCard from "./question-card";

const OPTIONS = [
  { title: "-", value: -1 },
  { title: "0 😕", value: 0 },
  { title: "1 🤓", value: 1 },
  { title: "2 🧐", value: 2 },
  { title: "3 😎", value: 3 },
];

export type InterviewQuestionProps = {
  question: {
    text: string;
    hint?: string;
  };
  interviewNote: string;
  rate: number;
  disabled?: boolean;

  onInterviewNoteChange?: (value: string) => void;
  onRateChange?: (value: number) => void;
};

export default function InterviewQuestion({
  question,
  interviewNote,
  rate,
  disabled,
  onInterviewNoteChange,
  onRateChange,
}: InterviewQuestionProps) {
  return (
    <div className="flex gap-4">
      <QuestionCard
        text={question.text}
        hint={question.hint}
        className="flex-1"
      />

      <textarea
        rows={4}
        className={clsx(
          "p-2 shadow-md rounded-md resize-none text-sm bg-white",
          disabled && "cursor-not-allowed"
        )}
        placeholder="Комментарий"
        value={interviewNote}
        disabled={disabled}
        onChange={(e) => onInterviewNoteChange?.(e.target.value)}
      ></textarea>

      <select
        className={clsx(
          "w-24 p-2 shadow-md rounded-md bg-white",
          disabled && "cursor-not-allowed"
        )}
        value={rate}
        disabled={disabled}
        onChange={(e) => onRateChange?.(+e.target.value)}
      >
        {OPTIONS.map((el) => (
          <option value={el.value} key={el.value}>
            {el.title}
          </option>
        ))}
      </select>
    </div>
  );
}
