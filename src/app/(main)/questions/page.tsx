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

  if ("error" in questions) {
    return <h1>Load error</h1>;
  }

  return (
    <>
      <QuestionsFilters />
      <QuestionsList questions={questions} />
    </>
  );
}
