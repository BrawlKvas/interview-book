import { useEffect, useState } from "react";
import Input, { InputProps } from "./input";
import clsx from "clsx";

export type AutocompleteOption = {
  label: string;
  value: string;
};

export type AutocompleteProps = {
  isLoading?: boolean;
  options: AutocompleteOption[];
  onSelect?: (value: string) => void;
} & Omit<InputProps, "onSelect">;

export default function Autocomplete({
  isLoading,
  options,
  className,
  disabled,
  onSelect,
  ...rest
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, disabled]);

  return (
    <div className={clsx("inline-block relative", className)}>
      <Input
        {...rest}
        className="w-full"
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-800">Загрузка...</div>
          ) : options.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-800">
              Нет совпадений
            </div>
          ) : (
            <ul>
              {options.map((option) => (
                <li
                  key={option.value}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 border-b-2 last:border-b-0"
                  onMouseDown={() => onSelect?.(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
