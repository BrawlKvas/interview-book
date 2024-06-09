import { cookies } from "next/headers";

const SESSION_COOKIE_KEY = "xxXsessionXxx";

export type SessionData = {
  access_token: string;
  refresh_token: string;
};

export function setSession(tokens: SessionData) {
  cookies().set(SESSION_COOKIE_KEY, JSON.stringify(tokens), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 400, // 400 min
    sameSite: "strict",
  });
}

export function getSession(): SessionData | null {
  const value = cookies().get(SESSION_COOKIE_KEY)?.value;

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

export function clearSession() {
  cookies().delete(SESSION_COOKIE_KEY);
}
