import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={clsx("p-2 border border-gray-300 rounded", className)}
    />
  );
}
