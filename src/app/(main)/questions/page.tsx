import QuestionsList from "@/ui/questions-list";
import { getQuestions } from "@/lib/actions";
import QuestionsFilters from "@/ui/questions-filters";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    tagIds?: string;
    limit?: string;
    offset?: string;
  };
}) {
  const questions = await getQuestions(searchParams);

  console.log(questions);

  const mocks = [
    {
      id: 1,
      name: "В чем разница между var и let?",
      tagIds: [1, 2, 3],
    },
    {
      id: 2,
      name: "Сколько стоит литр томатного сока?",
      tagIds: [10, 9],
    },
  ];

  return (
    <>
      <QuestionsFilters />
      <QuestionsList questions={mocks} />
    </>
  );
}
