export default function Page({ params }: { params: { templateId: string } }) {
  return <h1>Страница шаблона - {params.templateId}</h1>;
}
