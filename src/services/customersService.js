import { apiRequest } from "./apiService";

export const getCustomers = (token) => {
  return apiRequest("/customers", { method: "GET", token });
};


