"use server";

import { redirect } from "next/navigation";
import { get, post, remove, patch } from "./request";
import { clearSession, setSession } from "./session";
import routes from "@/constants/routes";
import { revalidatePath } from "next/cache";

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

export type QuestionDTO = {
  id: number;
  name: string;
  tags: { id: number; name: string }[];
};

export async function getQuestions(
  query: {
    name?: string;
    tags?: string;
    page?: string;
    pageSize?: string;
  } = {}
) {
  const url = "/questions";
  const searchParams = new URLSearchParams(query).toString();

  return get<QuestionDTO[]>(url + (searchParams ? `?${searchParams}` : ""));
}

export async function addQuestion(newQuestion: {
  name: string;
  tagIds: number[];
}) {
  // TODO Добавить тип для ответа
  await post("/questions", newQuestion);

  revalidatePath("/questions");
  redirect("/questions");
}

export async function deleteQuestion(id: number) {
  // TODO Добавить тип для ответа
  await remove(`/questions/${id}`);

  revalidatePath("/questions");
}

export async function updateQuestion(newQuestion: {
  id: number;
  name?: string;
  tagIds?: number[];
}) {
  // TODO Добавить тип для ответа
  patch("/questions", newQuestion);

  revalidatePath("/questions");
  redirect("/questions");
}

export type TagDTO = {
  id: number;
  name: string;
};

export async function getTags(query?: {
  name?: string;
  page?: string;
  pageSize?: string;
}) {
  const url = "/tags";
  const searchParams = new URLSearchParams(query).toString();

  return get<TagDTO[]>(url + (searchParams ? `?${searchParams}` : ""));
}

export async function addTag(name: string) {
  return post<TagDTO>("/tags", { name });
}

export async function getTagById(id: number) {
  return get<TagDTO>(`/tags/${id}`);
}

export type CandidateDTO = {
  id: number;
  name: string;
  surname: string;
  specialty: string;
  grade: string;
  salary: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
};

export async function getCandidates() {
  return get<CandidateDTO[]>("/candidates");
}

export async function addCandidate(candidate: {
  name: string;
  surname: string;
  specialty: string;
  grade: string;
  experience: string;
}) {
  await post<CandidateDTO>("/candidates", candidate);

  revalidatePath("/candidates");
  redirect("/candidates");
}

export async function updateCandidate(candidate: {
  id: number;
  name: string;
  surname: string;
  specialty: string;
  grade: string;
  experience: string;
}) {
  await patch<CandidateDTO>("/candidates", candidate);

  revalidatePath("/candidates");
  redirect("/candidates");
}

export async function deleteCandidate(id: number) {
  await remove(`/candidates/${id}`);

  revalidatePath("/candidates");
  redirect("/candidates");
}
