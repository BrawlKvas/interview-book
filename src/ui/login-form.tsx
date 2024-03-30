"use client";

import { signIn } from "@/lib/actions";
import { isRequestError } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await signIn(formData);

    setError(isRequestError(res) ? res.error.message : null);
  };

  return (
    <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Вход в Interview Book
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form action={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 mb-1">
            Имя пользователя
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-1">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <SubmitButton />
        <Link
          href="/sign-up"
          type="button"
          className="w-full text-center bg-gray-200 text-gray-800 rounded-md py-2 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
        >
          Регистрация
        </Link>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-400 disabled:animate-pulse mb-4"
      disabled={pending}
    >
      Войти
    </button>
  );
}
