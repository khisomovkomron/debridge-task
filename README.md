# debridge-task

Test Task for QA backend + manual Engineer
Test task done and result shall be shared with HR Zlata @zlata_debridge.

Programming Language: TypeScript
Result: A link to a public GitHub repository

## Task Description

1. Fetch Orders List
  Retrieve the list of orders from the backend used by the page:
    [https://app.debridge.finance/orders](https://app.debridge.finance/orders)
    Implement pagination with 25 items per page.
2. Wallet Filter
  Add a filter by wallet address:
    BUnGokFzA1wu8vb6adHfyhnNvCxaVt6QyPNmmUNWPwET
    Only orders related to this wallet should be processed.
3. Fetch Order Details
  For each order from the filtered list, make an additional backend request to fetch order details.
    This request should correspond to the action performed in the UI when a user clicks on an order.
4. Wallet Address Validation
  In the order details response, verify that the filtered wallet address is present in at least one of the fields.
  - The wallet address:
    - May appear in different fields for different orders
    - May appear in multiple fields at once
    - Is not guaranteed to always be in the same field



## Expected Outcome

- A TypeScript-based implementation that:
  - Fetches and paginates orders
  - Applies wallet filtering
  - Fetches order details

Validates wallet address presence in order details

The final result should be provided as a link to a GitHub repository.