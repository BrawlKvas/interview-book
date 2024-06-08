import clsx from "clsx";

const RESULT_EMODJ: Record<string, string> = {
  0: "😕",
  1: "🤓",
  2: "🧐",
  3: "😎",
};

export type ComparisonTableData = {
  question: string;
  result1: number;
  result2: number;
};

export type ComparisonTableProps = {
  name1: string;
  name2: string;
  data: ComparisonTableData[];
};

export default function ComparisonTable({
  name1,
  name2,
  data,
}: ComparisonTableProps) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full py-2 align-middle">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 border-collapse ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Вопрос
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {name1}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {name2}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((result, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {result.question}
                    </td>
                    <td
                      className={clsx(
                        "px-6 py-4 text-m text-gray-900 whitespace-nowrap",
                        {
                          "bg-red-100": result.result1 < result.result2,
                          "bg-green-100": result.result1 > result.result2,
                        }
                      )}
                    >
                      {result.result1 === -1 ? "-" : result.result1}{" "}
                      {RESULT_EMODJ[result.result1]}
                    </td>
                    <td
                      className={clsx(
                        "px-6 py-4 text-m text-gray-900 whitespace-nowrap",
                        {
                          "bg-red-100": result.result1 > result.result2,
                          "bg-green-100": result.result1 < result.result2,
                        }
                      )}
                    >
                      {result.result2 === -1 ? "-" : result.result2}{" "}
                      {RESULT_EMODJ[result.result2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
