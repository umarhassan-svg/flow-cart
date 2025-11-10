// src/pages/BulkOrderPage.tsx
import React, { useState } from "react";
import Layout from "../components/layouts/layout-sidemenu";
import CSVUploader from "../components/CSVUploader/CSVUploader";
import { createBulkOrders } from "../services/order.service";
import type { BulkOrder } from "../services/order.service";
import { useNavigate } from "react-router-dom";

const BulkOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (orders: BulkOrder[]) => {
    setBusy(true);
    setMessage(null);

    try {
      await createBulkOrders(orders);
      setMessage(`Successfully submitted ${orders.length} orders.`);

      // Optionally redirect after a delay
      setTimeout(() => navigate("/admin/orders"), 900);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit bulk orders.";
      setMessage(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bulk Orders</h1>
          <div className="text-sm text-gray-500">
            Upload CSV to create orders
          </div>
        </div>

        <CSVUploader
          requiredFields={["customerName", "productId", "quantity", "price"]}
          onSubmit={handleSubmit}
        />

        {message && (
          <div className="mt-4 text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
            {message}
          </div>
        )}
        {busy && <div className="mt-2 text-sm text-gray-500">Processing…</div>}
      </div>
    </Layout>
  );
};

export default BulkOrderPage;
