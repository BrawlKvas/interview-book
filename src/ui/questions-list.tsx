"use client";

import QuestionCard from "./question-card";

export type QuestionsListProps = {
  questions: {
    id: number;
    name: string;
    tagIds: number[];
  }[];
};

export default function QuestionsList({ questions }: QuestionsListProps) {
  return (
    <div className="grid gap-4">
      {questions.map(({ id, name, tagIds }) => (
        <QuestionCard
          key={id}
          text={name}
          tags={tagIds.map(String)}
          onClick={() => console.log("Click " + id)}
          onDelete={() => console.log("Delete " + id)}
        />
      ))}
    </div>
  );
}
