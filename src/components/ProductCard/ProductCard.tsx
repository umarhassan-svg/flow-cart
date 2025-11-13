// src/components/ProductCard.tsx
import React from "react";
import type { Product } from "../../types/productTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
  onAdd?: (product: Product) => void; // optional handler for add-to-cart
  showAddBtn?: boolean;
};

const ProductCard: React.FC<Props> = ({
  product,
  onAdd,
  showAddBtn = true,
}) => {
  const navigate = useNavigate();

  return (
    <article
      className="tooltip bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col"
      data-tooltip={`Click to open ${product.name}`}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <button
        className="block w-full h-44 md:h-40 lg:h-48 overflow-hidden bg-gray-50"
        aria-label={`Open ${product.name}`}
      >
        <img
          src={
            product.imageUrl ||
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
        />
      </button>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-sm md:text-base font-medium text-gray-800">
            {product.name}
          </h3>
          <div className="text-sm md:text-base font-semibold text-gray-900">
            {product.currency ?? "$"}
            {Number(product.price).toFixed(2)}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {typeof product.stock === "number" ? (
              <span>
                {product.stock > 0
                  ? `In stock: ${product.stock}`
                  : "Out of stock"}
              </span>
            ) : (
              <span>—</span>
            )}
          </div>

          {showAddBtn && (
            <button
              onClick={() => onAdd?.(product)}
              disabled={product.stock === 0}
              className={`tooltip ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition
                ${
                  product.stock === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
