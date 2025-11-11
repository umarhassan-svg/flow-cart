import React from "react";
import type { OrderItem } from "../../services/order.service";

type Props = { item: OrderItem; customerId?: string };

const ShowOrderItem: React.FC<Props> = ({ item, customerId }) => {
  const price = item.price ?? 0;
  const total = price * item.quantity;

  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-white border rounded-md shadow-sm">
      <div className="min-w-0">
        {customerId && (
          <div className="text-xs text-gray-500">{customerId}</div>
        )}
        <div className="text-sm font-medium text-gray-800 truncate">
          {item.productId}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-700">
        <div className="text-right">
          <div className="text-xs">Qty</div>
          <div className="font-semibold">{item.quantity}</div>
        </div>

        <div className="text-right">
          <div className="text-xs">Price</div>
          <div className="font-semibold">Rs {price}</div>
        </div>

        <div className="text-right">
          <div className="text-xs">Total</div>
          <div className="font-semibold">Rs {total}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderItem;
