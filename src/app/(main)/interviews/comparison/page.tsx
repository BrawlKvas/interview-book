export default async function Page({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  return <div>Страница сравнения результатов интервью {searchParams.ids}</div>;
}
