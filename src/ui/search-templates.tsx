import { getTemplates } from "@/lib/actions";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteOption,
} from "./autocomplete";
import { useEffect, useState } from "react";
import { isRequestError } from "@/lib/utils";

export type SearchTemplatesProps = {
  className?: string;
  onSelect?: (template: AutocompleteOption) => void;
};

export default function SearchTemplates({
  className,
  onSelect,
}: SearchTemplatesProps) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const f = async () => {
      setIsLoading(true);

      const publicTemplates = await getTemplates({
        name: inputValue,
        isPublic: "true",
      });

      const privateTemplates = await getTemplates({
        name: inputValue,
        isPublic: "false",
      });

      setIsLoading(false);

      if (isRequestError(publicTemplates) || isRequestError(privateTemplates)) {
        return;
      }

      const seen = new Set();

      const merged = [...publicTemplates, ...privateTemplates].filter(
        (item) => {
          if (seen.has(item.id)) {
            return false;
          }

          seen.add(item.id);
          return true;
        }
      );

      const newOptions = merged.map((el) => ({
        label: el.name,
        value: el.id,
      }));

      setOptions(newOptions);
    };

    f();
  }, [inputValue]);

  const handleSelect: AutocompleteProps["onSelect"] = (v) => {
    const option = options.find((o) => o.value === v);

    if (option) {
      setInputValue(option?.label || "");
      onSelect?.(option);
    }
  };

  return (
    <Autocomplete
      type="search"
      options={options}
      value={inputValue}
      isLoading={isLoading}
      className={className}
      placeholder="Название шаблона"
      onChange={(e) => setInputValue(e.target.value)}
      onSelect={handleSelect}
    />
  );
}
