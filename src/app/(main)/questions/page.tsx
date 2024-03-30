import QuestionsList from "@/ui/questions-list";
import { getQuestions } from "@/lib/actions";
import QuestionsFilters from "@/ui/questions-filters";
import { isRequestError } from "@/lib/utils";

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

  if (isRequestError(questions)) {
    return <h1>Load error</h1>;
  }

  return (
    <>
      <QuestionsFilters />
      <QuestionsList questions={questions} />
    </>
  );
}
