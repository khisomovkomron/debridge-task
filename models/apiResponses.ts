import { Order } from "./order";

export interface FilteredOrdersRequest {
  giveChainIds: number[];
  takeChainIds: number[];
  filter: string;
  skip: number;
  take: number;
  filterMode: "Mixed";
}

export interface FilteredOrdersResponse {
  orders: Order[];
  totalCount: number;
}