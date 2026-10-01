import { apiRequest } from "./api.js";

export const getInventory = (token) => {
  return apiRequest("/inventory", { method: "GET", token });
};

export function createInventory(inventoryItem, token) {
    
  return apiRequest("/inventory", {
    method: "POST",
    body: inventoryItem,
    token,
  });
}





