import React from "react";
import type { Product } from "../../types/productTypes";

const ProductDetailItem: React.FC<{ item: Product }> = ({
  item,
}: {
  item: Product;
}) => {
  return (
    <div className="flex justify-between bg-white border rounded-md shadow-sm px-4 py-2 text-sm text-gray-700">
      <span>
        Product ID: <strong>{item.id}</strong>
      </span>
      <span>
        Qty: <strong>{item.stock}</strong>
      </span>
      {item.price && (
        <span>
          Price: <strong>Rs {item.price.toLocaleString()}</strong>
        </span>
      )}
    </div>
  );
};

export default ProductDetailItem;
