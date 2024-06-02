import { getTemplateById } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import Template from "@/ui/template";

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const template = await getTemplateById(params.templateId);

  if (isRequestError(template)) {
    return <h1>Load error</h1>;
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-700">
          Шаблон - &quot;{template.name}&quot;
        </h1>
      </div>

      <Template initTemplateData={template} />
    </>
  );
}
