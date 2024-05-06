import { getCandidates } from "@/lib/actions";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteOption,
} from "./autocomplete";
import { useEffect, useMemo, useState } from "react";
import { isRequestError } from "@/lib/utils";

export type SearchCandidatesProps = {
  className?: string;
  onSelect?: (candidate: AutocompleteOption) => void;
};

export default function SearchCandidates({
  className,
  onSelect,
}: SearchCandidatesProps) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const filteredOptions = useMemo(
    () => options.filter((o) => o.label.includes(inputValue)),
    [inputValue, options]
  );

  useEffect(() => {
    const f = async () => {
      const res = await getCandidates();

      if (!isRequestError(res)) {
        const newOptions = res.map((el) => ({
          label: `${el.surname} ${el.name}`,
          value: String(el.id),
        }));

        setOptions(newOptions);
      }
    };

    f();
  }, []);

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
      options={filteredOptions}
      value={inputValue}
      className={className}
      placeholder="ФИО кандидата"
      onChange={(e) => setInputValue(e.target.value)}
      onSelect={handleSelect}
    />
  );
}
