import React, { useMemo, useState } from "react";
import Layout from "../components/layouts/layout-sidemenu";
import { OrdersList } from "../utils/getOrders";
import ShowOrderItem from "../components/ShowOrderItem/ShowOrderItem";
import type { Order } from "../types/orderTypes";
import {
  FaEye,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaEllipsisH,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const STATUS = {
  completed: "bg-emerald-100 text-emerald-800",
  processing: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-rose-100 text-rose-800",
  default: "bg-gray-100 text-gray-700",
} as const;

const PAGE_SIZE = 8;

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const cls = (STATUS as Record<string, string>)[status] ?? STATUS.default;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${cls}`}
    >
      {status === "completed" ? (
        <FaCheckCircle className="w-3 h-3" />
      ) : status === "processing" ? (
        <FaClock className="w-3 h-3" />
      ) : (
        <FaTimesCircle className="w-3 h-3" />
      )}
      <span className="capitalize">{status}</span>
    </span>
  );
};

const OrdersListPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  // filter + compute total once per order
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return OrdersList.map((o) => ({
      ...o,
      totalQty: o.items.reduce((s, it) => s + it.quantity, 0),
    }))
      .filter((o) => (status === "all" ? true : o.status === status))
      .filter((o) => {
        if (!term) return true;
        if (
          o.id.toLowerCase().includes(term) ||
          o.customerId.toLowerCase().includes(term)
        )
          return true;
        return o.items.some(
          (it) =>
            it.productId.toLowerCase().includes(term) ||
            it.productId.toLowerCase().includes(term)
        );
      })
      .sort((a, b) =>
        a.createdAt && b.createdAt
          ? +new Date(b.createdAt) - +new Date(a.createdAt)
          : 0
      );
  }, [q, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggle = (id: string) => setExpanded((p) => (p === id ? null : id));

  return (
    <Layout>
      <div className="">
        <header className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Orders
          </h1>
          <p className="text-sm text-gray-500">
            Search, filter and inspect order items.
          </p>
        </header>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2 flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border-gray-300 border">
            <FaSearch className="w-4 h-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search order, customer, product"
              className="w-full bg-transparent outline-none text-sm text-gray-700"
            />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="tooltip rounded-full border px-3 py-1 text-sm bg-white border-gray-300 text-gray-700 outline-none"
            >
              <option value=" all">All</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center justify-end text-sm text-gray-600">
            Showing{" "}
            <span className="ml-1 font-medium text-gray-800">
              {filtered.length}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead className="bg-indigo-600 text-white text-sm">
                <tr>
                  <th className="px-6 py-3">Order</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pageItems.map((o: Order & { totalQty: number }) => (
                  <React.Fragment key={o.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{o.id}</div>
                        <div className="text-xs text-gray-500">
                          {o.createdAt
                            ? new Date(o.createdAt).toLocaleString()
                            : "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {o.customerId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill status={o.status ?? "default"} />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {o.totalQty}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => toggle(o.id)}
                            className="tooltip inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-sm"
                          >
                            <FaEye className="w-4 h-4" />{" "}
                            {expanded === o.id ? "Hide" : "Show"} Items
                          </button>
                          <button className="tooltip rounded-full p-2 hover:bg-gray-100">
                            <FaEllipsisH className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expanded === o.id && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                          <div className="grid gap-2">
                            {o.items.map((it) => (
                              <ShowOrderItem
                                key={`${o.id}-${it.productId}`}
                                item={it}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {pageItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y">
            {pageItems.map((o: Order & { totalQty: number }) => (
              <div key={o.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {o.id}
                    </div>
                    <div className="text-xs text-gray-400">{o.customerId}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        (STATUS as Record<string, string>)[
                          o.status as keyof typeof STATUS
                        ] ?? STATUS.default
                      }`}
                    >
                      {o.status}
                    </div>
                    <button
                      onClick={() => toggle(o.id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      {expanded === o.id ? (
                        <FaChevronUp className="w-4 h-4" />
                      ) : (
                        <FaChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  Qty: <span className="font-medium">{o.totalQty}</span>
                </div>

                {expanded === o.id && (
                  <div className="mt-3 border-t pt-3">
                    <div className="space-y-2">
                      {o.items.map((it) => (
                        <ShowOrderItem
                          key={`${o.id}-${it.productId}`}
                          item={it}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Minimal pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            Page {page} / {totalPages}
          </div>
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-full border disabled:opacity-50 tooltip"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-full border disabled:opacity-50 tooltip"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersListPage;
