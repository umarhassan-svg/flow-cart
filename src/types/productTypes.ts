// src/types/product.ts
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  sku?: string;
  imageUrl?: string;
  stock?: number;
};
