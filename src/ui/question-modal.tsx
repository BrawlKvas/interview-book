import dynamic from "next/dynamic";
import Tag from "./tag";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { TagDTO, getTagById } from "@/lib/actions";
import SearchTags, { SearchTagsProps } from "./SearchTags";
import { isRequestError } from "@/lib/utils";
import Spinner from "./spinner";

const Modal = dynamic(() => import("./modal"), { ssr: false });

export type QuestionModalProps = {
  isOpen?: boolean;
  mode?: "create" | "edit";
  initialValue?: {
    text?: string;
    hint?: string;
    tags?: number[];
    isPublic?: boolean;
  };
  onClose?: VoidFunction;
  onSubmit?: (value: {
    text: string;
    hint: string;
    tags: number[];
    isPublic: boolean;
  }) => void;
};

export default function QuestionModal({
  isOpen,
  mode = "create",
  initialValue = {},
  onClose,
  onSubmit,
}: QuestionModalProps) {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const hintArea = useRef<HTMLTextAreaElement>(null);
  const publicCheckbox = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTags([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const f = async () => {
      setIsLoading(true);

      const res = initialValue.tags
        ? ((await Promise.all(
            initialValue.tags.map((tagId) => getTagById(+tagId))
          ).then((res) => res.filter((el) => !isRequestError(el)))) as TagDTO[])
        : [];

      setTags(res);
      setIsLoading(false);
    };

    f();
  }, [initialValue.tags]);

  const handleDeleteTag = (id: number) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleSelectTag: SearchTagsProps["onSelect"] = async (tagId) => {
    if (tags.some((tag) => tag.id == tagId)) {
      return;
    }

    setIsLoading(true);

    const res = await getTagById(tagId);

    if (!isRequestError(res)) {
      setTags((prev) => [...prev, res]);
    }

    setIsLoading(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const text = textArea.current?.value || "";
    const hint = hintArea.current?.value || "";
    const isPublic = publicCheckbox.current?.checked || false;
    const tagIds = tags.map((tag) => tag.id);

    onSubmit?.({ text, hint, tags: tagIds, isPublic });
  };

  return (
    <Modal isOpen={isOpen} title="Добавить новый вопрос" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText" className="block mb-2">
            Текст вопроса:
          </label>
          <textarea
            ref={textArea}
            id="questionText"
            className="w-full border-2 rounded-md p-2"
            defaultValue={initialValue.text}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="questionHint" className="block">
            Ответ на вопрос:
          </label>
          <textarea
            ref={hintArea}
            id="questionHint"
            className="w-full border-2 rounded-md p-2"
            defaultValue={initialValue.hint}
          />
        </div>
        {mode !== "create" && (
          <div className="flex items-center space-x-2 mt-2">
            <label htmlFor="isPublic">Сделать публичным:</label>
            <input
              ref={publicCheckbox}
              id="isPublic"
              type="checkbox"
              className="form-checkbox text-indigo-600 h-5 w-5"
              defaultChecked={initialValue.isPublic}
            />
          </div>
        )}
        <div className="mt-4">
          <label className="block mb-2">Теги:</label>
          <SearchTags
            className="w-full"
            onSelect={handleSelectTag}
            disabled={isLoading}
            isAllowCreate={true}
          />
          <div className="mt-4 flex gap-2 min-h-8 items-center flex-wrap">
            {tags.map((tag) => (
              <Tag
                text={tag.name}
                key={tag.id}
                onDelete={() => handleDeleteTag(tag.id)}
              />
            ))}
            {isLoading && <Spinner />}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {mode === "create" ? "Создать" : "Сохранить"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
