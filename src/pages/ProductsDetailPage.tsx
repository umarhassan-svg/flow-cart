import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout-sidemenu";
import { getProductById } from "../services/products.service";
import type { Product } from "../types/productTypes";

const ProductsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message || "Failed to fetch product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
          Loading product…
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh] text-red-600 text-lg font-medium">
          Error: {error}
        </div>
      </Layout>
    );

  if (!product)
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
          Product not found.
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="tooltip mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
             bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700
             transition-all duration-200 shadow-sm"
        >
          <span className="text-base">←</span>
          Back to Products
        </button>

        {/* Product Detail Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.imageUrl || "https://via.placeholder.com/600x400"}
              alt={product.name}
              className="rounded-xl shadow-sm w-full h-80 object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-emerald-600">
                  {product.currency}
                  {product.price.toFixed(2)}
                </span>
              </div>

              <div
                className={`text-sm font-medium ${
                  product.stock > 0 ? "text-emerald-600" : "text-red-500"
                } mb-8`}
              >
                {product.stock > 0
                  ? `In stock: ${product.stock}`
                  : "Out of stock"}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={product.stock === 0}
                className={`tooltip flex-1 px-5 py-2.5 rounded-lg text-white font-medium transition ${
                  product.stock === 0
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/products")}
                className="tooltip flex-1 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsDetailPage;
