import QuestionsList from "@/ui/questions-list";
import { TagDTO, getQuestions, getTagById } from "@/lib/actions";
import QuestionsFilters from "@/ui/question-filters";
import { isRequestError } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    tags?: string;
    page?: string;
    pageSize?: string;
    isPublic?: string;
  };
}) {
  const questions = await getQuestions(searchParams);

  const tagIds = searchParams?.tags?.split(",");

  const tags = tagIds
    ? ((await Promise.all(tagIds.map((tagId) => getTagById(+tagId))).then(
        (res) => res.filter((el) => !isRequestError(el))
      )) as TagDTO[])
    : [];

  if (isRequestError(questions)) {
    return <h1>Load error</h1>;
  }

  return (
    <>
      <QuestionsFilters selectedTags={tags} />
      <QuestionsList questions={questions.reverse()} />
    </>
  );
}
