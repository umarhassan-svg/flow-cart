import api from "./api/axios";
import type { Product } from "../types/productTypes";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};