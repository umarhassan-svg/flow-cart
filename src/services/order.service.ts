// src/services/orders.service.ts
import api from "../api/axios";

export type BulkOrderItem = {
  productId: string;
  quantity: number;
  price?: number;
};

export type BulkOrder = {
  customerName: string;
  items: BulkOrderItem[];
  // optional metadata fields accepted by backend
  [key: string]: unknown;
};

export const createBulkOrders = async (orders: BulkOrder[]): Promise<unknown> => {
  // Endpoint - update if your backend uses /orders/bulk or /bulk-orders
  const res = await api.post("/orders/bulk", { orders });
  return res.data;
};
