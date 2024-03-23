"use server";

import { redirect } from "next/navigation";
import { get, post, remove } from "./request";
import { clearSession, setSession } from "./session";
import routes from "@/constants/routes";

export async function signIn(formData: FormData) {
  const login = formData.get("username") as string;
  const password = formData.get("password") as string;

  const data = await post<{ access_token: string; refresh_token: string }>(
    "/auth/auth",
    { login, password }
  );

  if ("access_token" in data) {
    setSession(data);

    redirect(routes.templates);
  }

  return data;
}

export async function signUp(formData: FormData) {
  const login = formData.get("username") as string;
  const password = formData.get("password") as string;
  const repeatedPassword = formData.get("repeatedPassword") as string;

  if (password !== repeatedPassword) {
    return {
      error: {
        message: "Пароли не совпадают",
      },
    };
  }

  const data = await post<{ access_token: string; refresh_token: string }>(
    "/auth/register",
    { login, password }
  );

  if ("access_token" in data) {
    setSession(data);

    redirect(routes.templates);
  }

  return data;
}

export async function logOut() {
  clearSession();

  redirect(routes.signIn);
}

type QuestionDTO = {
  id: number;
  name: string;
  tagIds: number[];
};

export async function getQuestions(query?: {
  name?: string;
  tagIds?: string;
  limit?: string;
  offset?: string;
}) {
  const url = "/questions";
  const searchParams = new URLSearchParams(query).toString();

  const data = await get<QuestionDTO[]>(
    url + (searchParams ? `?${searchParams}` : "")
  );

  return data;
}

export async function deleteQuestion(id: number) {
  return await remove(`/questions/${id}`);
}
