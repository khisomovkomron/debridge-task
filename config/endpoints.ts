export const endpoints = {
  filteredOrders: "/api/Orders/filteredList",
  orderDetails: (orderId: string) =>
    `/api/Orders/${encodeURIComponent(orderId)}`,
};