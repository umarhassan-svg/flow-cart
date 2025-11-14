import React from "react";
import type { CartItem } from "../../context/CartContext";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  item: CartItem;
  onChangeQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  className?: string;
};

const fmt = (v: number) =>
  v.toLocaleString(undefined, { style: "currency", currency: "USD" });

const CartItemRow: React.FC<Props> = ({
  item,
  onChangeQty,
  onRemove,
  className,
}) => {
  const setQty = (next: number) => {
    const q = Math.max(1, Math.floor(next));
    if (q !== item.quantity) onChangeQty(item.productId, q);
  };

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white shadow-lg rounded-lg ${
        className ?? ""
      }`}
      data-testid="cart-item-row"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-full sm:w-20 h-20 sm:h-20 rounded-md bg-gray-50 border flex items-center justify-center text-xs text-gray-400">
        <img
          src={item.imageUrl ?? ""}
          alt={item.name ?? item.productId}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {item.name ?? item.productId}
            </div>
            {item.price !== undefined && (
              <div className="text-xs text-gray-500 mt-1">
                {fmt(Number(item.price))} each
              </div>
            )}
          </div>

          {/* Remove icon */}
          <button
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name ?? item.productId}`}
            title="Remove"
            className="tooltip ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <FaTrash className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Controls row */}
        <div className="mt-3 flex items-center justify-between sm:justify-start gap-4">
          <div className="inline-flex items-center border rounded-md overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setQty(item.quantity - 1)}
              aria-label="Decrease quantity"
              className="tooltip px-3 py-2 text-gray-600 hover:bg-gray-50"
            >
              <FaMinus className="w-3.5 h-3.5" />
            </button>

            <input
              className="w-14 text-center text-sm py-2 outline-none"
              type="number"
              min={1}
              value={item.quantity}
              disabled
              aria-label="Quantity"
            />

            <button
              type="button"
              onClick={() => setQty(item.quantity + 1)}
              aria-label="Increase quantity"
              className="tooltip px-3 py-2 text-gray-600 hover:bg-gray-50"
            >
              <FaPlus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-sm text-gray-700 font-medium">
            {item.price !== undefined
              ? fmt(Number(item.price) * item.quantity)
              : "—"}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemRow;
