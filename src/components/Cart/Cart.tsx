import React from "react";
import { useCart } from "../../context/CartContext";

const CartComponent: React.FC = () => {
  const { items, count, total, updateQty, removeItem, clear } = useCart();

  if (items.length === 0)
    return (
      <div className="p-4 bg-white rounded shadow text-center text-gray-600">
        Cart is empty
      </div>
    );

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Cart ({count})</h3>
        <div className="text-sm text-gray-600">
          Total: Rs {total.toFixed(2)}
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it.productId}
            className="flex items-center justify-between border rounded p-2"
          >
            <div>
              <div className="font-medium">{it.productId}</div>
              <div className="text-xs text-gray-500">{it.name ?? ""}</div>
            </div>

            <div className="flex items-center gap-2">
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
                className="w-16 border rounded px-2 py-1 text-sm"
              />
              <div className="w-20 text-right text-sm">
                Rs {Number(it.price ?? 0).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(it.productId)}
                className="text-xs text-red-600 px-2 py-1"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => clear()}
          className="px-3 py-2 border rounded text-sm"
        >
          Clear
        </button>
        <button
          onClick={() => {
            // hook to checkout — use CartService.checkout(items) if integrated
            alert("Proceed to checkout (implement server flow)");
          }}
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
