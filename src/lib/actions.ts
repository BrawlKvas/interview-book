"use server";

import { redirect } from "next/navigation";
import { get, post, remove, patch } from "./request";
import { clearSession, setSession } from "./session";
import routes from "@/constants/routes";
import { revalidatePath } from "next/cache";
import { isRequestError } from "./utils";
import { InterviewStatus } from "./types";

/* AUTH */
export async function signIn(formData: FormData) {
  const login = formData.get("username") as string;
  const password = formData.get("password") as string;

  const data = await post<{ access_token: string; refresh_token: string }>(
    "/auth/auth",
    { login, password }
  );

  if ("access_token" in data) {
    revalidatePath("/");

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
    revalidatePath("/");

    setSession(data);

    redirect(routes.templates);
  }

  return data;
}

export async function logOut() {
  clearSession();

  redirect(routes.signIn);
}

export type UserDTO = {
  id: number;
  login: string;
};

export async function getMe() {
  return get<UserDTO>("/user/me");
}

/* QUESTIONS */
export type QuestionDTO = {
  id: number;
  name: string;
  hint: string | null;
  tags: { id: number; name: string }[];
  isPublic: boolean;
  creator: UserDTO;
};

export async function getQuestions({
  isPublic,
  ...query
}: {
  name?: string;
  tags?: string;
  page?: string;
  pageSize?: string;
  isPublic?: string;
} = {}) {
  const url = isPublic === "true" ? "/questions" : "/questions/my-questions";
  const searchParams = new URLSearchParams(query).toString();

  return get<QuestionDTO[]>(url + (searchParams ? `?${searchParams}` : ""));
}

export async function addQuestion(newQuestion: {
  name: string;
  hint: string;
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

export async function updateQuestion({
  isPublic,
  ...newQuestion
}: {
  id: number;
  name?: string;
  hint?: string;
  tagIds?: number[];
  isPublic?: boolean;
}) {
  // TODO Добавить тип для ответа

  await patch("/questions", newQuestion);

  if (isPublic !== undefined) {
    await updateIsPublicQuestion(newQuestion.id, isPublic);
  }

  revalidatePath("/questions");
  redirect("/questions");
}

export async function updateIsPublicQuestion(id: number, isPublic: boolean) {
  const searchParams = new URLSearchParams({
    id: String(id),
    isPublic: String(isPublic),
  }).toString();

  return patch(`/questions/isPublic?${searchParams}`, {});
}

/* TAGS */
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

/* CANDIDATE */
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
  await post<CandidateDTO>("/candidates", {
    ...candidate,
    speciality: candidate.specialty,
  });

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
  await patch<CandidateDTO>("/candidates", {
    ...candidate,
    speciality: candidate.specialty,
  });

  revalidatePath("/candidates");
  redirect("/candidates");
}

export async function deleteCandidate(id: number) {
  await remove(`/candidates/${id}`);

  revalidatePath("/candidates");
  redirect("/candidates");
}

/* TEMPLATES */
export type TemplateDTO = {
  id: string;
  isPublic: boolean;
  name: string;
  order: string[];
  user: UserDTO;
};

export type TemplateQuestionDTO = {
  id: string;
  note: string | null;
  question: {
    id: number;
    name: string;
    hint?: string;
  };
};

export type TemplateWithQuestionsDTO = TemplateDTO & {
  questions: TemplateQuestionDTO[];
};

export async function getTemplates({
  isPublic,
  ...query
}: {
  name?: string;
  page?: string;
  pageSize?: string;
  isPublic?: string;
} = {}) {
  const url = isPublic === "true" ? "/template" : "/template/user";
  const searchParams = new URLSearchParams(query).toString();

  return get<TemplateDTO[]>(url + (searchParams ? `?${searchParams}` : ""));
}

export async function getTemplateById(id: string) {
  return get<TemplateWithQuestionsDTO>(`/template/${id}`);
}

export async function addTemplate(name: string) {
  const templateId = await post<string>(
    "/template",
    { name, isPublic: false },
    { parseRule: "text" }
  );

  revalidatePath("/templates");

  if (!isRequestError(templateId)) {
    redirect(`/templates/${templateId}`);
  } else {
    redirect(`templates`);
  }
}

export async function deleteTemplate(id: string) {
  await remove(`/template/${id}`);

  revalidatePath("/templates");
  redirect("/templates");
}

export async function addTemplateQuestions(templateId: string, ids: number[]) {
  const res = await Promise.all(
    ids.map((id) =>
      post<string>(
        "/template/question",
        { templateId, questionId: id },
        { parseRule: "text" }
      )
    )
  );

  revalidatePath("/templates");

  return res;
}

export async function deleteTemplateQuestion(id: string) {
  await remove(`/template/question/${id}`);

  revalidatePath("/templates");
}

export async function updateTemplateQuestionsOrder(
  templateId: string,
  order: string[]
) {
  await patch("/template", { templateId, order });

  revalidatePath("/templates");
}

export async function updateTemplateIsPublic(id: string, isPublic: boolean) {
  const searchParams = new URLSearchParams({
    id,
    isPublic: String(isPublic),
  });

  await patch(`/template/isPublic?${searchParams.toString()}`, {});

  revalidatePath("/templates");
}

export async function updateTemplateName(id: string, name: string) {
  const searchParams = new URLSearchParams({
    id,
    name,
  });

  await patch(`/template/name?${searchParams.toString()}`, {});

  revalidatePath("/templates");
}

/* INTERVIEWS */

export type InterviewResultDTO = {
  id: string;
  question: { id: number; name: string; hint?: string; isPublic?: boolean };
  rate: number;
  interviewNote: string;
};

export type InterviewDTO = {
  id: string;
  isResultPublished: boolean;
  status: InterviewStatus;
  template: TemplateWithQuestionsDTO;
  result: InterviewResultDTO[];
  candidate?: CandidateDTO;
  date: string;
  finalFeedback?: string;
};

export async function createInterview(payload: {
  date: string;
  templateId: string;
  candidateId: number;
}) {
  const res = await post<InterviewDTO>("/interview", payload);

  revalidatePath("/interviews");

  return res;
}

export async function getInterviews() {
  return get<Omit<InterviewDTO, 'result' | 'isResultPublished'>[]>(
    "/interview/history/all-interviews"
  );
}

export async function getInterviewById(interviewId: string) {
  return get<InterviewDTO>(`/interview/${interviewId}`);
}

export async function updateInterviewStatus(
  interviewId: string,
  status: InterviewStatus
) {
  await patch(`/interview/status?id=${interviewId}&status=${status}`, {});

  revalidatePath("/interviews");
}

export async function addInterviewResult(body: {
  interviewId: string;
  questionId: number;
  rate: number;
  interviewNote: string;
}) {
  await post(`/interview/result`, body);

  revalidatePath("/interviews");
}

export async function updateInterviewResult(body: {
  id: string;
  rate: number;
  interviewNote: string;
}) {
  await patch("/interview/update-question-result", body);

  revalidatePath("/interviews");
}

export async function updateInterviewFinalFeedback(interviewId: string, finalFeedback: string) {
  await patch("/interview/feedback/update", { interviewId, finalFeedback });

  revalidatePath("/interviews");
}

export async function updateInterviewVisibility(id: string, visibility: boolean) {
  const searchParams = new URLSearchParams({
    id,
    visibility: String(visibility),
  });

  await patch(`/interview/visibility?${searchParams.toString()}`, {});
}
