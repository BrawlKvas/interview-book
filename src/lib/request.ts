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

export async function request<T extends Object>(
  url: string,
  init?: RequestInit
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

    const data = (await res.json()) as T;

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

export async function get<T extends Object>(url: string) {
  return request<T>(url);
}

export async function post<T extends Object>(url: string, body: Object) {
  return request<T>(url, { method: "POST", body: JSON.stringify(body) });
}

export async function patch<T extends Object>(url: string, body: Object) {
  return request<T>(url, { method: "PATCH", body: JSON.stringify(body) });
}

export async function remove<T extends Object>(url: string) {
  return request<T>(url, { method: "DELETE" });
}
