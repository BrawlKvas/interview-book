"use client";

import QuestionCard from "./question-card";

const OPTIONS = [0, 1, 2, 3, 4, 5];

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
        className="p-2 shadow-md rounded-md resize-none text-sm"
        placeholder="Комментарий"
        value={interviewNote}
        disabled={disabled}
        onChange={(e) => onInterviewNoteChange?.(e.target.value)}
      ></textarea>

      <select
        className="w-24 p-2 shadow-md rounded-md"
        value={rate}
        disabled={disabled}
        onChange={(e) => onRateChange?.(+e.target.value)}
      >
        {OPTIONS.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
