import { getTemplates } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import TemplatesList from "@/ui/templates-list";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
  };
}) {
  const templates = await getTemplates(searchParams);

  if (isRequestError(templates)) {
    return <h1>Load error</h1>;
  }

  return <TemplatesList templates={templates} />;
}
