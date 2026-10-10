import { httpClient } from "./httpClient";
import { endpoints } from "../config/endpoints";
import {
  FilteredOrdersRequest,
  FilteredOrdersResponse,
} from "../models/apiResponses";

// TASK 1: Fetch an orders page; skip and take control pagination.
// TASK 2: Send the wallet filter in the request body.
async function getFilteredOrders(
  body: FilteredOrdersRequest,
): Promise<FilteredOrdersResponse> {

  const response = await httpClient.post<FilteredOrdersResponse>(
    endpoints.filteredOrders,
    body,
  );

  const data = response.data;

  for (const [index, order] of data.orders.entries()) {
    if (
      typeof order?.orderId?.stringValue !== "string" ||
      !order.orderId.stringValue.trim()
    ) {
      throw new Error(
        `Invalid orders response: order at index ${index} has no valid ID.`,
      );
    }
  }

  return data;
}

// TASK 3: Fetch order details using the GET endpoint captured from the UI.
async function getOrderDetails(orderId: string): Promise<unknown> {
  const response = await httpClient.get<unknown>(
    endpoints.orderDetails(orderId),
  );

  return response.data;
}

export const orderApi = {
  getFilteredOrders,
  getOrderDetails,
};