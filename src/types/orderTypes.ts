export type OrderItem = {
  productId: string;
  quantity: number;
  price?: number; 
  imageUrl?: string;
};

// Used when uploading bulk CSV orders
export type BulkOrder = {
  customerId: string;
  items: OrderItem[];
  meta?: Record<string, unknown>; 
};

export type statusType = "pending" | "processing" | "completed" | "cancelled";
export type STATUS = {
  [key in statusType]: string;
};
// What is stored or returned from backend after order submission
export type Order = {
  id: string; 
  customerId: string;
    items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
  status?: statusType;
  meta?: Record<string, unknown>;
};