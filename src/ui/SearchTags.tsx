import { useCallback, useEffect, useState } from "react";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteOption,
} from "./autocomplete";
import { getTags } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";

export type SearchTagsProps = {
  className?: string;
  disabled?: boolean;
  onSelect?: (tagId: number) => void;
};

export default function SearchTags({
  className,
  disabled,
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
        setOptions(res.map((el) => ({ label: el.name, value: String(el.id) })));
      }

      setIsLoading(false);
    };

    f();
  }, [inputValue]);

  const handleChange: AutocompleteProps["onChange"] = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelect: AutocompleteProps["onSelect"] = (value) => {
    setInputValue("");
    onSelect?.(+value);
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
