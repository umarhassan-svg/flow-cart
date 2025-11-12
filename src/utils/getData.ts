// ----------------------
// Dummy data (detailed)
// ----------------------


// Monthly sales (for line chart)
const monthlySales = [
{ month: "Jan", orders: 120, revenue: 5400 },
{ month: "Feb", orders: 160, revenue: 7200 },
{ month: "Mar", orders: 190, revenue: 9800 },
{ month: "Apr", orders: 220, revenue: 11200 },
{ month: "May", orders: 260, revenue: 13800 },
{ month: "Jun", orders: 300, revenue: 16700 },
{ month: "Jul", orders: 280, revenue: 15800 },
{ month: "Aug", orders: 320, revenue: 18500 },
{ month: "Sep", orders: 340, revenue: 19200 },
{ month: "Oct", orders: 370, revenue: 21800 },
{ month: "Nov", orders: 410, revenue: 24500 },
{ month: "Dec", orders: 480, revenue: 29000 },
];


// Sales by category (pie)
const salesByCategory = [
{ name: "Electronics", value: 42000 },
{ name: "Apparel", value: 26000 },
{ name: "Home & Living", value: 19000 },
{ name: "Health", value: 9000 },
{ name: "Grocery", value: 7000 },
];
const CATEGORY_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];


// Top products by revenue (bar)
const topProducts = [
{ name: "Smartphone X100", revenue: 12000 },
{ name: "N-Canelling Headset", revenue: 9500 },
{ name: "Running Shoes Pro", revenue: 7600 },
{ name: "Coffee Maker 2L", revenue: 6100 },
{ name: "Vitamin Pack", revenue: 4200 },
];


// Orders by status (pie/donut)
const ordersByStatus = [
{ name: "Pending", value: 120 },
{ name: "Processing", value: 280 },
{ name: "Shipped", value: 520 },
{ name: "Delivered", value: 3600 },
{ name: "Cancelled", value: 45 },
];


// Revenue by region (stacked bar / simple bar)
const revenueByRegion = [
{ region: "North", revenue: 42000 },
{ region: "South", revenue: 30000 },
{ region: "East", revenue: 26000 },
{ region: "West", revenue: 22000 },
{ region: "Central", revenue: 14000 },
];

// Key metrics
const KPIS = {
  totalRevenue: 123450,
  totalOrders: 5420,
  avgOrderValue: 22.8,
  activeCustomers: 1890,
};


export {
    monthlySales,
    salesByCategory,
    CATEGORY_COLORS,
    topProducts,
    ordersByStatus,
    revenueByRegion,
    KPIS
};