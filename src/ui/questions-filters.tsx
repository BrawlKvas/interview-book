// TODO Убрать этот компонент

export default function QuestionsFilters() {
  return (
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
  );
}
