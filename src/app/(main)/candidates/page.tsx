import { getCandidates } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import CandidatesList from "@/ui/candidates-list";

export default async function Page() {
  const candidates = await getCandidates();

  if (isRequestError(candidates)) {
    return <h1>Load error</h1>;
  }

  return <CandidatesList candidates={candidates} />;
}
