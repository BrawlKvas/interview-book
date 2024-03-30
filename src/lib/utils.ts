import { RequestError } from "./request";

export function isRequestError(res: unknown): res is RequestError {
  return (
    typeof res === "object" &&
    res !== null &&
    "error" in res &&
    typeof res.error === "object" &&
    res.error !== null &&
    "message" in res.error
  );
}
