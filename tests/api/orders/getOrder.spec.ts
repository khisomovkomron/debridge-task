import { orderApi } from "../../../api/orderApi";
import {
  walletAddress,
  pageSize,
} from "../../../fixtures/orderFixtures";
import { delay } from "../../../utils/waitFor";
import { containsWallet } from "../../../utils/containsWallet";


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

    // TASK 3: Fetch details for every order returned on the first filtered page.
    for (const order of result.orders) {
        await delay(1_000);
  
        const orderId = order.orderId.stringValue;
        const details = await orderApi.getOrderDetails(orderId);
  
    // TASK 4: Fail if the wallet is absent from all fields of the details response.
        if (!containsWallet(details, walletAddress)) {
          throw new Error(
            `Wallet ${walletAddress} was not found in details ` +
              `of order ${orderId}.`,
          );
        }
      }
    }, 120_000);
  });

// ПРИМЕЧАНИЕ ДЛЯ АЛЕКСАНДРА:
// При получении деталей заказов API возвращал 429 Too Many Requests.
// Добавлена задержка в 1 секунду между запросами деталей.
// Тест обрабатывает одну страницу — до 25 заказов (take: 25).
// Параметр filter отбирает заказы по указанному адресу кошелька.
// Пагинация проверяется отдельно в listOrders.spec.ts.