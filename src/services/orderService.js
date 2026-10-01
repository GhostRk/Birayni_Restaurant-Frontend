import { apiRequest } from "./api.js";

export const getOrders = (token,dateRange = {}) => {
  return apiRequest("/orders", { method: "GET", token, params: dateRange });
};

export  function createOrder(order, token) {
  return  apiRequest("/orders", {
    method: "POST",
    body: order,
    token,
  });
}
