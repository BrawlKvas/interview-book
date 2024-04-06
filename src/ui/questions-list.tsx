"use client";

import { QuestionDTO, deleteQuestion, updateQuestion } from "@/lib/actions";
import QuestionCard from "./question-card";
import QuestionModal, { QuestionModalProps } from "./question-modal";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type QuestionsListProps = {
  questions: QuestionDTO[];
};

export default function QuestionsList({ questions }: QuestionsListProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDTO | null>(
    null
  );

  console.log("RENDER");

  const handleEditQuestion: QuestionModalProps["onSubmit"] = ({
    text,
    tags,
  }) => {
    if (selectedQuestion) {
      updateQuestion({ id: selectedQuestion?.id, name: text, tagIds: tags });
    }
    setSelectedQuestion(null);
  };

  const handleDelete = async (id: number) => {
    await deleteQuestion(id);
    replace(`/questions?${searchParams.toString()}`);
  };

  return (
    <div className="grid gap-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          text={question.name}
          tags={question.tags.map((tag) => tag.name)}
          onClick={() => setSelectedQuestion(question)}
          onDelete={() => handleDelete(question.id)}
        />
      ))}
      <QuestionModal
        isOpen={!!selectedQuestion}
        initialValue={{
          text: selectedQuestion?.name,
          tags: selectedQuestion?.tags.map((tag) => tag.id),
        }}
        btnText="Сохранить"
        onClose={() => setSelectedQuestion(null)}
        onSubmit={handleEditQuestion}
      />
    </div>
  );
}
