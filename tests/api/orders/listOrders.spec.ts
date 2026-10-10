import { orderApi } from "../../../api/orderApi";
import {
  walletAddress,
  pageSize,
} from "../../../fixtures/orderFixtures";
import { delay } from "../../../utils/waitFor";

// TASK 1: Verify pagination with two pages of 25 filtered orders.
describe("Orders pagination", () => {
  test("returns different orders on the next page", async () => {
    const request = {
      giveChainIds: [],
      takeChainIds: [],
      filter: walletAddress,
      skip: 0,
      take: pageSize,
      filterMode: "Mixed" as const,
    };

    const firstPage = await orderApi.getFilteredOrders(request);

    await delay(1_000);

    const secondPage = await orderApi.getFilteredOrders({
      ...request,
      skip: pageSize,
    });

    // This wallet currently has enough orders for two full pages.
    expect(firstPage.totalCount).toBeGreaterThanOrEqual(
      pageSize * 2,
    );
    expect(firstPage.orders).toHaveLength(pageSize);
    expect(secondPage.orders).toHaveLength(pageSize);

    const firstPageIds = firstPage.orders.map(
      (order) => order.orderId.stringValue,
    );

    const secondPageIds = secondPage.orders.map(
      (order) => order.orderId.stringValue,
    );

    expect(new Set(firstPageIds).size).toBe(pageSize);
    expect(new Set(secondPageIds).size).toBe(pageSize);

    for (const id of secondPageIds) {
      expect(firstPageIds).not.toContain(id);
    }
  });
});