import { orderApi } from "../../../api/orderApi";
import {
  walletAddress,
  pageSize,
} from "../../../fixtures/orderFixtures";
import { delay } from "../../../utils/waitFor";

describe("Wallet orders", () => {
  test("fetches details for one filtered page", async () => {
    const result = await orderApi.getFilteredOrders({
      giveChainIds: [],
      takeChainIds: [],
      filter: walletAddress,
      skip: 0,
      take: pageSize,
      filterMode: "Mixed",
    });

    expect(result.orders.length).toBeGreaterThan(0);
    expect(result.orders.length).toBeLessThanOrEqual(pageSize);

    for (const order of result.orders) {
      await delay(1_000); // 1 секунда задержка между запросами

      const details = await orderApi.getOrderDetails(
        order.orderId.stringValue,
      );

      expect(details).toBeDefined();
      expect(details).not.toBeNull();
    }
  }, 120_000);
});

// NOTE FOR ALEKSANDR:
// для получения всех заказов столкнулься с ошибкой 429 - Too Many Requests. Поэтому добавил задержку в 1 секунду между запросами. 
// также добавил фильтр Take: 25 заказов, чтобы по таймауту проходить, в реальныйх условиях можно динамично все менять