import { InterviewDTO, getInterviewById } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import Interview from "@/ui/interview";

export default async function Page({
  params,
}: {
  params: { interviewId: string };
}) {
  const interview = await getInterviewById(params.interviewId);

  if (isRequestError(interview)) {
    return <h1>Load error</h1>;
  }

  return <Interview initInterviewData={interview} />;
}
