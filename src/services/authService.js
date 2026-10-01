import { apiRequest } from "./api.js";

export function loginUser(credentials) {
  return apiRequest("/login", {
    method: "POST",
    body: credentials,
  });
}

