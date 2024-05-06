import dynamic from "next/dynamic";
import SearchTemplates from "./search-templates";
import SearchCandidates from "./search-candidates";
import { useState } from "react";
import { createInterview } from "@/lib/actions";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";

const Modal = dynamic(() => import("./modal"), { ssr: false });

type StartInterviewModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
};

export default function StartInterviewModal({
  isOpen,
  onClose,
}: StartInterviewModalProps) {
  const [date, setDate] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<number | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const { push } = useRouter();

  const handleStart = async () => {
    if (!date || !candidate || !template) {
      alert("Заполните все поля");
      return;
    }

    await createInterview({
      date,
      candidateId: candidate,
      templateId: template,
    });

    onClose?.();
    push(routes.interviews);
  };

  return (
    <Modal title="Новое интервью" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <label className="flex items-center">
          <span className="w-24 text-gray-600">Дата:</span>
          <input
            type="datetime-local"
            className="w-1/2 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
            onChange={(e) => setDate(new Date(e.target.value).toISOString())}
          />
        </label>

        <label className="flex items-center">
          <span className="w-24 text-gray-600">Кандидат:</span>
          <SearchCandidates
            className="flex-1"
            onSelect={(v) => setCandidate(+v.value)}
          />
        </label>

        <label className="flex items-center">
          <span className="w-24 text-gray-600">Шаблон:</span>
          <SearchTemplates
            className="flex-1"
            onSelect={(v) => setTemplate(v.value)}
          />
        </label>
      </div>

      <button
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleStart}
      >
        Начать интервью
      </button>
    </Modal>
  );
}
