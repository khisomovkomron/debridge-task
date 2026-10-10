import { orderApi } from "../api/orderApi";
import { Order } from "../models/order";
import { pageSize } from "../fixtures/orderFixtures";

async function getAllOrdersByWallet(
  walletAddress: string,
): Promise<Order[]> {
  const request = {
    giveChainIds: [],
    takeChainIds: [],
    filter: walletAddress,
    skip: 0,
    take: pageSize,
    filterMode: "Mixed" as const,
  };

  const firstPage = await orderApi.getFilteredOrders(request);
  const orders: Order[] = [...firstPage.orders];

  const totalPages = Math.ceil(firstPage.totalCount / pageSize);

  for (let page = 1; page < totalPages; page++) {
    const result = await orderApi.getFilteredOrders({
      ...request,
      skip: page * pageSize,
    });

    orders.push(...result.orders);
  }

  if (orders.length !== firstPage.totalCount) {
    throw new Error(
      `Expected ${firstPage.totalCount} orders, received ${orders.length}.`,
    );
  }

  return orders;
}

export const orderService = {
  getAllOrdersByWallet,
};