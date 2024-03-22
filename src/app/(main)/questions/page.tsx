import PencilIcon from "@/ui/icons/pencil";
import TrashIcon from "@/ui/icons/trash";

export default function Page() {
  const tagClassName = "bg-blue-100 text-blue-500 px-2 py-1 rounded-full"; // Однородный класс для тегов

  return (
    <>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Поиск по тексту вопроса"
          className="w-1/3 p-2 mr-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Поиск по тегу вопроса"
          className="w-1/3 p-2 border border-gray-300 rounded"
        />
        <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Добавить вопрос
        </button>
      </div>
      <div className="grid gap-4">
        {/* Карточка 1 */}
        <div className="bg-white shadow-md rounded-md p-5 flex flex-col">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">
              Какие у вас планы на ближайшие выходные?
            </div>
            <div className="space-x-4 shrink-0">
              <button className="text-blue-500 hover:text-blue-700">
                <PencilIcon />
              </button>
              <button className="text-red-500 hover:text-red-700 ml-2">
                <TrashIcon />
              </button>
            </div>
          </div>
          <div className="mt-2 space-x-2">
            <span className={tagClassName}>Планы</span>
            <span className={tagClassName}>Выходные</span>
          </div>
        </div>
        {/* Карточка 2 */}
        <div className="bg-white shadow-md rounded-md p-5 flex flex-col">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">
              Что вы обычно заказываете в кафе или ресторане?
            </div>
            <div className="space-x-4 shrink-0">
              <button className="text-blue-500 hover:text-blue-700">
                <PencilIcon />
              </button>
              <button className="text-red-500 hover:text-red-700 ml-2">
                <TrashIcon />
              </button>
            </div>
          </div>
          <div className="mt-2 space-x-2">
            <span className={tagClassName}>Еда</span>
            <span className={tagClassName}>Заказ</span>
          </div>
        </div>
        {/* Другие карточки */}
      </div>
    </>
  );
}
