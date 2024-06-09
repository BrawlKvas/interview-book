import { useCallback, useEffect, useState } from "react";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteOption,
} from "./autocomplete";
import { addTag, getTags } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";

export type SearchTagsProps = {
  className?: string;
  disabled?: boolean;
  isAllowCreate?: boolean;
  onSelect?: (tagId: number) => void;
};

export default function SearchTags({
  className,
  disabled,
  isAllowCreate,
  onSelect,
}: SearchTagsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  useEffect(() => {
    const f = async () => {
      setIsLoading(true);

      const res = await getTags({
        name: inputValue,
        page: "1",
        pageSize: "5",
      });

      if (!isRequestError(res)) {
        const hasExactMatch = res.some((tag) => tag.name === inputValue);
        const newOptions = res.map((el) => ({
          label: el.name,
          value: String(el.id),
        }));

        if (isAllowCreate && !hasExactMatch && inputValue) {
          newOptions.unshift({
            label: `Создать тег "${inputValue}"`,
            value: "create",
          });
        }

        setOptions(newOptions);
      }

      setIsLoading(false);
    };

    f();
  }, [inputValue, isAllowCreate]);

  const handleChange: AutocompleteProps["onChange"] = (e) => {
    setInputValue((prev) =>
      e.target.value.length > 32 ? prev : e.target.value
    );
  };

  const handleSelect: AutocompleteProps["onSelect"] = async (value) => {
    setInputValue("");

    if (value === "create") {
      await addTag(inputValue);
    } else {
      onSelect?.(+value);
    }
  };

  return (
    <Autocomplete
      type="search"
      placeholder="Название тега"
      className={className}
      options={options}
      isLoading={isLoading}
      value={inputValue}
      disabled={disabled}
      onChange={handleChange}
      onSelect={handleSelect}
    />
  );
}
