import type { Order } from "../types/orderTypes";

// 📦 Dummy Orders Data
export const OrdersList: Order[] = [
  {
    id: "ORD-001",
    customerId: "CID-001",
    items: [
      { productId: "P001", quantity: 3, price: 1200 },
      { productId: "P002", quantity: 1, price: 850 },
    ],
    createdAt: "2025-11-01T09:30:00Z",
    updatedAt: "2025-11-01T10:15:00Z",
    status: "completed",
    meta: { paymentMethod: "Credit Card", region: "North" },
  },
  {
    id: "ORD-002",
    customerId: "CID-002",
    items: [
      { productId: "P003", quantity: 2, price: 1500 },
      { productId: "P006", quantity: 1, price: 2200 },
    ],
    createdAt: "2025-11-03T12:45:00Z",
    updatedAt: "2025-11-04T08:30:00Z",
    status: "processing",
    meta: { paymentMethod: "Cash on Delivery", region: "South" },
  },
  {
    id: "ORD-003",
    customerId: "CID-003",
    items: [
      { productId: "P005", quantity: 4, price: 900 },
      { productId: "P009", quantity: 2, price: 1800 },
    ],
    createdAt: "2025-11-04T15:10:00Z",
    updatedAt: "2025-11-05T09:00:00Z",
    status: "pending",
    meta: { paymentMethod: "Debit Card", region: "East" },
  },
  {
    id: "ORD-004",
    customerId: "CID-004",
    items: [
      { productId: "P008", quantity: 5, price: 650 },
      { productId: "P010", quantity: 1, price: 2500 },
    ],
    createdAt: "2025-11-06T10:05:00Z",
    updatedAt: "2025-11-07T07:20:00Z",
    status: "completed",
    meta: { paymentMethod: "UPI", region: "West" },
  },
  {
    id: "ORD-005",
    customerId: "CID-005",
    items: [
      { productId: "P002", quantity: 2, price: 950 },
      { productId: "P004", quantity: 1, price: 1250 },
    ],
    createdAt: "2025-11-08T11:50:00Z",
    updatedAt: "2025-11-09T08:00:00Z",
    status: "processing",
    meta: { paymentMethod: "Credit Card", region: "Central" },
  },
  {
    id: "ORD-006",
    customerId: "CID-006",
    items: [
      { productId: "P007", quantity: 3, price: 1300 },
      { productId: "P005", quantity: 1, price: 900 },
    ],
    createdAt: "2025-11-09T16:25:00Z",
    updatedAt: "2025-11-10T10:45:00Z",
    status: "completed",
    meta: { paymentMethod: "Bank Transfer", region: "North" },
  },
  {
    id: "ORD-007",
    customerId: "CID-007",
    items: [
      { productId: "P011", quantity: 1, price: 3200 },
      { productId: "P012", quantity: 2, price: 1900 },
    ],
    createdAt: "2025-11-10T13:30:00Z",
    updatedAt: "2025-11-10T18:30:00Z",
    status: "cancelled",
    meta: { paymentMethod: "PayPal", region: "South" },
  },
  {
    id: "ORD-008",
    customerId: "CID-008",
    items: [
      { productId: "P014", quantity: 2, price: 1750 },
      { productId: "P015", quantity: 4, price: 700 },
    ],
    createdAt: "2025-11-11T09:40:00Z",
    updatedAt: "2025-11-11T11:10:00Z",
    status: "pending",
    meta: { paymentMethod: "Credit Card", region: "East" },
  },
  {
    id: "ORD-009",
    customerId: "CID-009",
    items: [
      { productId: "P016", quantity: 1, price: 2500 },
      { productId: "P017", quantity: 3, price: 1200 },
    ],
    createdAt: "2025-11-11T15:00:00Z",
    updatedAt: "2025-11-11T18:00:00Z",
    status: "completed",
    meta: { paymentMethod: "UPI", region: "West" },
  },
  {
    id: "ORD-010",
    customerId: "CID-010",
    items: [
      { productId: "P018", quantity: 6, price: 450 },
      { productId: "P019", quantity: 2, price: 1300 },
    ],
    createdAt: "2025-11-12T08:30:00Z",
    updatedAt: "2025-11-12T09:00:00Z",
    status: "processing",
    meta: { paymentMethod: "Credit Card", region: "Central" },
  },
];
