import { getInterviews } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import EmptyPlate from "@/ui/empty-plate";
import InterviewsList from "@/ui/interviews-list";

export default async function Page() {
  const interviews = await getInterviews();

  if (isRequestError(interviews)) {
    return <h1>Load error</h1>;
  }

  if (interviews.length === 0) {
    return <EmptyPlate />;
  }

  return <InterviewsList interviews={interviews} />;
}
