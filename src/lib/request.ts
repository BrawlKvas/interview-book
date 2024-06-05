import { getSession } from "./session";

export type RequestError = {
  error: {
    message: string;
    statusCode?: number;
  };
};

const isEnableLog = process.env.ENABLE_LOG === "true";

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

    if (isEnableLog) {
      console.log({ type: 'REQUEST', url: API_HOST + url, method: init.method || 'GET', body: init.body });
    }

    const res = await fetch(API_HOST + url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(session ? { Authorization: "Bearer " + session.access_token } : {}),
        ...init?.headers,
      },
    });

    const data = (await (parseRule === "json" ? res.json() : res.text())) as T;

    if (isEnableLog) {
      console.log({ type: 'RESPONSE', url: API_HOST + url, data });
    }

    if (!res.ok) {
      const requestError = {
        error: {
          message:
            "message" in data ? (data.message as string) : res.statusText,
          statusCode:
            "statusCode" in data ? (data.statusCode as number) : res.status,
        },
      };

      if (isEnableLog) {
        console.log({ type: 'RESPONSE_ERROR', url: API_HOST + url, error: requestError });
      }

      return requestError
    }

    return data;
  } catch (error) {
    if (isEnableLog) {
      console.log({ type: 'FETCH_ERROR', url: API_HOST + url, error });
    }

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
