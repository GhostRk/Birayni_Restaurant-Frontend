import { apiRequest } from "./api.js";

export const getMenu = (token) => {
  return apiRequest("/menu", { method: "GET", token });
};

export function createMenuItem(menuItem, token) {
    
  return apiRequest("/menu", {
    method: "POST",
    body: menuItem,
    token,
  });
}




