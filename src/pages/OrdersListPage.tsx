import React, { useState } from "react";
import Layout from "../components/layouts/layout-sidemenu";
import { OrdersList } from "../utils/getOrders";
import ShowOrderItem from "../components/ShowOrderItem/ShowOrderItem";
import type { Order } from "../types/orderTypes";

const OrdersListPage: React.FC = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Orders List</h1>
          <p className="text-sm text-gray-500">
            View all customer orders and their items.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-700 text-sm font-medium">
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer ID</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Total Qty</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {OrdersList.map((order: Order) => {
                const totalQty = order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <React.Fragment key={order.id}>
                    {/* Main order row */}
                    <tr className="hover:bg-gray-50 transition" key={order.id}>
                      <td className="px-4 py-2 border-b font-medium text-gray-800">
                        {order.id}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        {order.customerId}
                      </td>
                      <td className="px-4 py-2 border-b capitalize">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b text-gray-700">
                        {totalQty}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => toggleOrder(order.id)}
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          {expandedOrderId === order.id ? "Hide" : "Show"} Items
                        </button>
                      </td>
                    </tr>

                    {/* Expanded items section */}
                    {expandedOrderId === order.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-6 py-4">
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <ShowOrderItem key={item.productId} item={item} />
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersListPage;
