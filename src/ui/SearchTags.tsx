import { useEffect, useState } from "react";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteOption,
} from "./autocomplete";
import { getTags } from "@/lib/actions";

export type SearchTagsProps = {
  className?: string;
};

export default function SearchTags({ className }: SearchTagsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const handleChange: AutocompleteProps["onChange"] = async (e) => {
    setIsLoading(true);

    const res = await getTags({
      name: e.target.value,
      page: "1",
      pageSize: "5",
    });

    if (!("error" in res)) {
      setOptions(res.map((el) => ({ label: el.name, value: String(el.id) })));
    }

    setIsLoading(false);
  };

  return (
    <Autocomplete
      type="search"
      placeholder="Поиск по тегу вопроса"
      className={className}
      options={options}
      isLoading={isLoading}
      onChange={handleChange}
    />
  );
}
