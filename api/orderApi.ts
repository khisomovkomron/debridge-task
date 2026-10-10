import { httpClient } from "./httpClient";
import { endpoints } from "../config/endpoints";
import {
  FilteredOrdersRequest,
  FilteredOrdersResponse,
} from "../models/apiResponses";

async function getFilteredOrders(
  body: FilteredOrdersRequest,
): Promise<FilteredOrdersResponse> {

  const response = await httpClient.post<FilteredOrdersResponse>(
    endpoints.filteredOrders,
    body,
  );

  const data = response.data;

  if (!data || !Array.isArray(data.orders)) {
    throw new Error("Invalid orders response: orders must be an array.");
  }

  if (!Number.isInteger(data.totalCount) || data.totalCount < 0) {
    throw new Error(
      "Invalid orders response: totalCount must be a non-negative integer.",
    );
  }

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