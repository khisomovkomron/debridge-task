# debridge-task

TypeScript API test project for the deBridge QA backend + manual Engineer task.

## Task Description

1. **Fetch Orders List**

   Retrieve orders from the backend used by [the orders page](https://app.debridge.finance/orders). Implement pagination with 25 items per page.

2. **Wallet Filter**

   Filter orders by the wallet address:

   ```text
   BUnGokFzA1wu8vb6adHfyhnNvCxaVt6QyPNmmUNWPwET
   ```

   Only orders related to this wallet should be processed.

3. **Fetch Order Details**

   For each order from the filtered list, make an additional backend request for its details. Use the request performed when a user clicks an order in the UI.

4. **Wallet Address Validation**

   Verify that the wallet address appears in at least one field of each order’s details. The address may appear in different fields, in multiple fields, or inside nested objects and arrays.

## Expected Outcome

A TypeScript implementation that fetches and paginates orders, applies wallet filtering, fetches order details, and validates wallet presence.

The final result is a link to a public GitHub repository, shared with HR Zlata (@zlata_debridge).

## Technology

- TypeScript
- Jest and ts-jest
- Axios
- dotenv

## Setup

Install Node.js and npm, then clone the repository:

```bash
git clone https://github.com/khisomovkomron/debridge-task.git
cd debridge-task
npm ci
```

Create the local environment file:

```bash
cp .env.example .env
```

The required setting is:

```env
BASE_URL=https://stats-api.dln.trade
```

DB, Kafka, and API token settings are unused by the current tests. The `.env` file is excluded from Git.

## Run

Check TypeScript types:

```bash
npm run typecheck
```

Run all tests sequentially:

```bash
npm test -- --runInBand
```

Run individual scenarios:

```bash
npm test -- --runInBand tests/api/orders/listOrders.spec.ts
npm test -- --runInBand tests/api/orders/getOrder.spec.ts
```

## Project Structure

```text
config/       Configurations and endpoints
api/          httpClient
models/       Interface and API responses
fixtures/     Fixtures
services/     Business logic and services
utils/        Helpers   
tests/api/    Tests 
```

DB, Kafka, and other empty helper files are scaffolding and are unused by the current scenarios.

## Test Coverage

Pagination

listOrders.spec.ts requests two pages using the same wallet filter:

First page: skip: 0, take: 25.

Second page: skip: 25, take: 25.

It checks that each page contains 25 orders, IDs are unique within each page, and the pages do not overlap. This scenario assumes the wallet has at least 50 orders.

Order Details and Wallet Validation

getOrder.spec.ts retrieves the first filtered page of up to 25 orders. It requests details for every returned order and recursively checks response values for an exact wallet address match.

A missing wallet fails the test with the corresponding order ID. HTTP errors also fail the test.

Four additional scenarios are marked with test.todo and are not implemented.

## Примечания для код-ревьера
Изначально в интервью было задание за короткое время сделать фреймворк, я потратил больше времени и сделал готовый фреймворк с работающий кодом и тестами. Тесты проходят
Код и настройка фреймворка (как запустить) была выполнена с помощью ИИ (частично), так как пока что изучаю Typescript. 
Структура, тесты, переменные были реализованы мной. 

В коде есть комменты - TASK 1, 2, 3, 4 описывающие где выполнены задания.

Результаты тестов:
```
komronkhisomov@Komrons-Laptop debridge % npm test -- --runInBand

> debridge@1.0.0 test
> jest --runInBand

 PASS  tests/api/orders/getOrder.spec.ts (28.747 s)
 PASS  tests/api/orders/listOrders.spec.ts
 PASS  tests/integration/orders/orderLifecycle.spec.ts
 PASS  tests/e2e/flow_orderLifecycle.spec.ts
 PASS  tests/api/orders/createOrder.spec.ts
 PASS  tests/negative/orders/invalidOrder.spec.ts

Test Suites: 6 passed, 6 total
Tests:       4 todo, 2 passed, 6 total
Snapshots:   0 total
Time:        30.965 s, estimated 32 s
Ran all test suites.
```