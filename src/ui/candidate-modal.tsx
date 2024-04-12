import dynamic from "next/dynamic";
import Input from "./input";
import { FormEventHandler } from "react";

const Modal = dynamic(() => import("./modal"), { ssr: false });

type CandidateModalForm = {
  name: string;
  surname: string;
  speciality: string;
  grade: string;
  experience: string;
};

export type CandidateModalProps = {
  isOpen?: boolean;
  initialValue?: CandidateModalForm;
  btnText?: string;
  onClose?: VoidFunction;
  onSubmit?: (value: CandidateModalForm) => void;
};

const FIELDS_CONFIG = [
  {
    name: "name",
    label: "Имя",
  },
  {
    name: "surname",
    label: "Фамилия",
  },
  {
    name: "speciality",
    label: "Специальность",
  },
  {
    name: "grade",
    label: "Grade",
  },
  {
    name: "experience",
    label: "Опыт",
  },
] as const;

export default function CandidateModal({
  isOpen,
  initialValue,
  onClose,
  onSubmit,
}: CandidateModalProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const values = Array.from(elements).reduce((acc, el) => {
      const { name, value } = el as HTMLInputElement;

      if (!name) return acc;

      acc[name as keyof CandidateModalForm] = value;

      return acc;
    }, {} as CandidateModalForm);

    onSubmit?.(values);
  };

  return (
    <Modal title="Добавить нового кандидата" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {FIELDS_CONFIG.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <Input
                name={field.name}
                required={true}
                className="mt-1 w-full"
                defaultValue={initialValue?.[field.name]}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
}
