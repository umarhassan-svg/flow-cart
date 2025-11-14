import React, { useMemo } from "react";

type Props = {
  subtotal: number;
  taxRate?: number; // 0.05 => 5%
  shipping?: number;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  submitLabel?: string;
  onSubmit?: (e?: React.FormEvent) => void;
};

const fmt = (v: number) =>
  v.toLocaleString(undefined, { style: "currency", currency: "USD" });

const OrderDetails: React.FC<Props> = ({
  subtotal,
  taxRate = 0.05,
  shipping = 0,
  className,
  loading = false,
  disabled = false,
  submitLabel = "Place order",
  onSubmit,
}) => {
  const tax = useMemo(
    () => +(subtotal * taxRate).toFixed(2),
    [subtotal, taxRate]
  );
  const total = useMemo(
    () => +(subtotal + tax + shipping).toFixed(2),
    [subtotal, tax, shipping]
  );

  return (
    <aside
      className={`bg-white border border-gray-200 rounded-xl shadow-sm p-4 ${
        className ?? ""
      }`}
      aria-label="Order details"
    >
      <div className="flex items-center justify-center mb-3">
        <h4 className="text-lg font-semibold text-black">Order summary</h4>
      </div>

      <dl className="text-sm text-gray-600 space-y-2">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{fmt(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax ({(taxRate * 100).toFixed(0)}%)</dt>
          <dd>{fmt(tax)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd>{fmt(shipping)}</dd>
        </div>
        <div className="border-t pt-3 mt-3 flex justify-between items-center">
          <div className="text-sm font-semibold text-gray-900">Total</div>
          <div className="text-sm font-semibold text-gray-900">
            {fmt(total)}
          </div>
        </div>
      </dl>

      {/* Submit Button */}
      <div className="pt-2 ">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(e);
          }}
          type="submit"
          disabled={loading || disabled}
          className="tooltip w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-900 text-white py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Processing…" : submitLabel}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        By placing the order, you confirm that your contact details are correct.
      </p>
    </aside>
  );
};

export default OrderDetails;
