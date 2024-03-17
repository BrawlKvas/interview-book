"use client";

import { signUp } from "@/lib/actions";
import { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await signUp(formData);

    setError("error" in res ? res.error.message : null);
  };

  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Регистрация в Interview Book
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              htmlFor="repeatedPassword"
              className="block text-gray-600 mb-1"
            >
              Повторите пароль
            </label>
            <input
              type="password"
              name="repeatedPassword"
              id="repeatedPassword"
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
