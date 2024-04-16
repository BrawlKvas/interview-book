import { TemplateQuestionDTO } from "@/lib/actions";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import QuestionCard, { QuestionCardProps } from "./question-card";

const SortableItem = SortableElement<QuestionCardProps>(QuestionCard);

export type TemplateQuestionsProps = {
  questions: TemplateQuestionDTO[];
};

function TemplateQuestions({ questions }: TemplateQuestionsProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <SortableItem
          text={question.question.name}
          index={index}
          key={question.id}
          className="cursor-move"
        />
      ))}
    </div>
  );
}

export default SortableContainer<TemplateQuestionsProps>(TemplateQuestions);
