"use client";

import QuestionCard from "./question-card";

export type QuestionsListProps = {
  questions: {
    id: number;
    name: string;
    tags: { id: number; name: string }[];
  }[];
};

export default function QuestionsList({ questions }: QuestionsListProps) {
  return (
    <div className="grid gap-4">
      {questions.map(({ id, name, tags }) => (
        <QuestionCard
          key={id}
          text={name}
          tags={tags.map((tag) => tag.name)}
          onClick={() => console.log("Click " + id)}
          onDelete={() => console.log("Delete " + id)}
        />
      ))}
    </div>
  );
}
