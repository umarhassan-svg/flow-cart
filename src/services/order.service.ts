// src/services/orders.service.ts
import api from "./api/axios";

// A single product entry inside an order
export type OrderItem = {
  productId: string;
  quantity: number;
  price?: number; // optional, can be added client or server side
};

// Used when uploading bulk CSV orders
export type BulkOrder = {
  customerId: string;
  items: OrderItem[]; // Always an array
  meta?: Record<string, unknown>; // Optional metadata bag
};

// What is stored or returned from backend after order submission
export type Order = {
  id: string; // every stored order should have an ID
  customerId: string;
  items: OrderItem[]; // Always an array (consistent)
  createdAt?: string;
  updatedAt?: string;
  status?: "pending" | "processing" | "completed" | "cancelled";
  meta?: Record<string, unknown>;
};

export const createBulkOrders = async (orders: BulkOrder[]): Promise<unknown> => {
  // Endpoint - update if your backend uses /orders/bulk or /bulk-orders
  const res = await api.post("/orders/bulk", { orders });
  return res.data;
};
