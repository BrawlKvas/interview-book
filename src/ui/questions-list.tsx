"use client";

import { QuestionDTO, deleteQuestion, updateQuestion } from "@/lib/actions";
import QuestionCard from "./question-card";
import QuestionModal, { QuestionModalProps } from "./question-modal";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyPlate from "./empty-plate";
import { useUser } from "@/context/user";
import ConfirmationModal from "@/ui/confirmation-modal";

export type QuestionsListProps = {
  questions: QuestionDTO[];
};

export default function QuestionsList({ questions }: QuestionsListProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDTO | null>(
    null
  );

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);

  const user = useUser();

  const handleEditQuestion: QuestionModalProps["onSubmit"] = ({
    text,
    hint,
    tags,
    isPublic,
  }) => {
    if (selectedQuestion) {
      updateQuestion({
        id: selectedQuestion?.id,
        name: text,
        hint,
        tagIds: tags,
        isPublic,
      });
    }
    setSelectedQuestion(null);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleConfirm = async () => {
    handleCancel();

    if (currentQuestion) {
      await deleteQuestion(currentQuestion);
      replace(`/questions?${searchParams.toString()}`);
    }
  };

  const handleDelete = async (id: number) => {
    setCurrentQuestion(id);
    setConfirmModalOpen(true);
  };

  if (questions.length === 0) {
    return <EmptyPlate />;
  }

  return (
    <div className="grid gap-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          hint={question.hint || ""}
          text={question.name}
          tags={question.tags.map((q) => q.name)}
          onClick={
            question.creator.id === user?.id
              ? () => setSelectedQuestion(question)
              : undefined
          }
          onDelete={
            question.creator.id === user?.id
              ? () => handleDelete(question.id)
              : undefined
          }
        />
      ))}
      <QuestionModal
        isOpen={!!selectedQuestion}
        mode="edit"
        initialValue={{
          text: selectedQuestion?.name,
          tags: selectedQuestion?.tags.map((tag) => tag.id),
          hint: selectedQuestion?.hint || "",
          isPublic: selectedQuestion?.isPublic,
        }}
        onClose={() => setSelectedQuestion(null)}
        onSubmit={handleEditQuestion}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Удалить вопрос?"
        message="Вы уверены, что хотите удалить этот вопрос?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
