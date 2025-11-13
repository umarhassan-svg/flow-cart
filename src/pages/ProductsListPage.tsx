// src/pages/ProductsListPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import type { Product } from "../types/productTypes";
import Layout from "../components/layouts/layout-sidemenu";
import { getProducts } from "../services/products.service";

const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getProducts()
      .then((data) => {
        if (!mounted) return;
        setProducts(data ?? []);
      })
      .catch((err) => {
        console.warn("Failed to load products:", err?.message ?? err);
        if (!mounted) return;
        setError("Unable to load products from server. Showing sample data.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = (p: Product) => {
    console.log("Add to cart:", p);
  };

  return (
    <>
      <Layout>
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Products
              </h1>
              <div className="text-sm text-gray-500">
                {products.length} items
              </div>
            </div>

            {/* Bulk Orders Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/bulk-orders")}
                className="tooltip bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm text-sm"
              >
                Bulk Orders
              </button>
            </div>
          </div>

          {loading && (
            <div className="py-10 text-center text-gray-500">
              Loading products…
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded bg-yellow-50 text-yellow-800 border border-yellow-100">
              {error}
            </div>
          )}

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAdd} />
            ))}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default ProductsListPage;
