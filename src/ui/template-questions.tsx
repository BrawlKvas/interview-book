import { TemplateQuestionDTO } from "@/lib/actions";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import QuestionCard, { QuestionCardProps } from "./question-card";

const SortableItem = SortableElement<QuestionCardProps>(QuestionCard);

export type TemplateQuestionsProps = {
  questions: TemplateQuestionDTO[];
  disabled?: boolean;
  onDelete?: (id: string) => void;
};

function TemplateQuestions({ questions, disabled, onDelete }: TemplateQuestionsProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {questions.map((question, index) => (
        <SortableItem
          text={question.question.name}
          index={index}
          key={question.id}
          className={disabled ? 'auto' : "cursor-move"}
          disabled={disabled}
          onDelete={() => onDelete?.(question.id)}
        />
      ))}
    </div>
  );
}

export default SortableContainer<TemplateQuestionsProps>(TemplateQuestions);
