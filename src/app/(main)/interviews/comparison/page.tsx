import { getInterviewById } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import ComparisonTable, { ComparisonTableData } from "@/ui/comparison-table";

export default async function Page({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  const [id1, id2] = searchParams.ids?.split(",") || [];

  if (!id1 || !id2) {
    return <h1>Load error</h1>;
  }

  const interview1 = await getInterviewById(id1);
  const interview2 = await getInterviewById(id2);

  if (isRequestError(interview1) || isRequestError(interview2)) {
    return <h1>Load error</h1>;
  }

  const name1 = `${interview1.candidate?.surname} ${interview1.candidate?.name}`;
  const name2 = `${interview2.candidate?.surname} ${interview2.candidate?.name}`;

  const seen = new Set();
  const data: ComparisonTableData[] = [];

  for (let i = 0; i < interview1.result.length; i++) {
    const { question, rate } = interview1.result[i];

    seen.add(question.id);

    const result2 = interview2.result.find(
      (r) => r.question.id === question.id
    );

    data.push({
      question: question.name,
      result1: rate,
      result2: result2?.rate || -1,
    });
  }

  data.push(
    ...interview2.result
      .filter((r) => !seen.has(r.question.id))
      .map((r) => ({ question: r.question.name, result1: -1, result2: r.rate }))
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-700 mb-4">
        Сравнение интервью
      </h1>

      <ComparisonTable name1={name1} name2={name2} data={data} />
    </>
  );
}
