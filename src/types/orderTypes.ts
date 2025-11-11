export type OrderItem = {
  productId: string;
  quantity: number;
  price?: number; 
};

// Used when uploading bulk CSV orders
export type BulkOrder = {
  customerId: string;
  items: OrderItem[];
  meta?: Record<string, unknown>; 
};

// What is stored or returned from backend after order submission
export type Order = {
  id: string; 
  customerId: string;
    items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
  status?: "pending" | "processing" | "completed" | "cancelled";
  meta?: Record<string, unknown>;
};