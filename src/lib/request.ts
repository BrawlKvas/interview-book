import { getSession } from "./session";

export type RequestError = {
  error: {
    message: string;
    statusCode?: number;
  };
};

const API_HOST = process.env.USE_MOCKS
  ? process.env.SERVER_MOCKS_HOST
  : process.env.API_HOST;

export type RequestInitWithParseRule = RequestInit & {
  parseRule?: "json" | "text";
};

export async function request<T extends Object>(
  url: string,
  { parseRule = "json", ...init }: RequestInitWithParseRule = {}
): Promise<T | RequestError> {
  try {
    const session = getSession();

    const res = await fetch(API_HOST + url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(session ? { Authorization: "Bearer " + session.access_token } : {}),
        ...init?.headers,
      },
    });

    const data = (await (parseRule === "json" ? res.json() : res.text())) as T;

    if (!res.ok) {
      return {
        error: {
          message:
            "message" in data ? (data.message as string) : res.statusText,
          statusCode:
            "statusCode" in data ? (data.statusCode as number) : res.status,
        },
      };
    }

    return data;
  } catch (error) {
    return {
      error: {
        message: "Failed to fetch",
      },
    };
  }
}

export async function get<T extends Object>(
  url: string,
  init?: RequestInitWithParseRule
) {
  return request<T>(url, init);
}

export async function post<T extends Object>(
  url: string,
  body: Object,
  init?: RequestInitWithParseRule
) {
  return request<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
    ...init,
  });
}

export async function patch<T extends Object>(
  url: string,
  body: Object,
  init?: RequestInitWithParseRule
) {
  return request<T>(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...init,
  });
}

export async function remove<T extends Object>(
  url: string,
  init?: RequestInitWithParseRule
) {
  return request<T>(url, { method: "DELETE", ...init });
}
