import React from "react";
import { useCart } from "../../context/CartContext";

const fmt = (v = 0) => Number(v).toFixed(2);

const CartComponent: React.FC = () => {
  const { items, count, total, updateQty, removeItem, clear } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center text-gray-600">
          <div className="text-2xl mb-2">🛒</div>
          <div className="font-medium">Your cart is empty</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-5/6 flex flex-col">
      {/* header */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-800">
            Items: {count}
          </div>
        </div>
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.map((it) => {
          const lineTotal = (Number(it.price ?? 0) || 0) * it.quantity;
          return (
            <div
              key={it.productId}
              className="flex items-center justify-between gap-3 bg-white border rounded p-2"
            >
              {/* left: title */}
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">
                  {it.name ?? it.productId}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  ID: {it.productId}
                </div>
              </div>

              {/* right: controls */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) =>
                    updateQty(
                      it.productId,
                      Math.max(1, Number(e.target.value) || 1)
                    )
                  }
                  className="w-14 text-center text-sm border rounded px-1 py-0.5"
                />

                <div className="text-right text-sm text-gray-800 min-w-[80px]">
                  <div className="text-xs text-gray-500">
                    Rs {fmt(it.price)}
                  </div>
                  <div className="font-semibold">Rs {fmt(lineTotal)}</div>
                </div>

                <button
                  onClick={() => removeItem(it.productId)}
                  className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="px-4 py-3 border-t bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Subtotal</div>
            <div className="text-lg font-semibold text-gray-900">
              Rs {fmt(total)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => clear()}
              className="px-3 py-2 border rounded text-sm"
            >
              Clear
            </button>
            <button
              onClick={() => alert("Checkout — implement server flow")}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
