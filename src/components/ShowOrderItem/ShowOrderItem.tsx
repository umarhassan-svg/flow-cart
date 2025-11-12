import React from "react";
import type { OrderItem } from "../../types/orderTypes";

const ShowOrderItem = ({ item }: { item: OrderItem }) => {
  return (
    <div className="flex justify-between bg-white border rounded-md shadow-sm px-4 py-2 text-sm text-gray-700">
      <span>
        Product ID: <strong>{item.productId}</strong>
      </span>
      <span>
        Qty: <strong>{item.quantity}</strong>
      </span>
      {item.price && (
        <span>
          Price: <strong>Rs {item.price.toLocaleString()}</strong>
        </span>
      )}
    </div>
  );
};

export default ShowOrderItem;
