// src/components/BulkOrderComp/BulkOrderComp.tsx
import { useState } from "react";
import type { BulkOrder } from "../../services/order.service";
import MyDropzone from "../ui/MyDropZone";
import { useParseCSV } from "../../hooks/useParseCSV";
import ShowOrderItem from "../ui/ShowOrderItem";
import { useCart } from "../../context/CartContext";
import { makeBulk } from "../../utils/makeBulk";
import { useNavigate } from "react-router-dom";

const BulkOrderComp = () => {
  const navigate = useNavigate();
  const { parseFile } = useParseCSV();
  const { addBulkOrder } = useCart();

  const [bulk, setBulk] = useState<BulkOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setError(null);
    setBulk(null);
    setLoading(true);
    try {
      // parseFile(file) returns the parsed rows immediately (no race with hook state)
      const result = await parseFile(file);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedRows = (result as any)?.rows ?? (result as any)?.data ?? [];
      if (!parsedRows || parsedRows.length === 0)
        throw new Error("CSV contained no rows.");

      // makeBulk validates and returns a BulkOrder (may throw)
      const created = makeBulk(parsedRows);
      setBulk(created);
    } catch (err: unknown) {
      setBulk(null);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!bulk) return setError("No valid bulk order to add.");
    addBulkOrder(bulk);
    setBulk(null);
    setError(null);
    setLoading(false);

    //reload the component
    navigate(0);
  };

  return (
    <div className="space-y-4 justify-center">
      <MyDropzone onUpload={handleUpload} fileExtensions={[".csv"]} />

      {loading && <p className="text-sm text-gray-500">Parsing CSV…</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      {/* Preview */}
      {bulk ? (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Preview (first 5 items)
          </p>
          <div className="grid gap-2">
            {bulk.items.slice(0, 5).map((it, i) => (
              <ShowOrderItem key={i} item={it} customerId={bulk.customerId} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!bulk}
          className="px-3 py-2 bg-emerald-600 text-white rounded disabled:opacity-60"
        >
          Add all to cart
        </button>
      </div>
    </div>
  );
};

export default BulkOrderComp;
