import Layout from "../components/layouts/layout-sidemenu";
import { KPIS, monthlySales } from "../utils/getData";
import { salesByCategory, CATEGORY_COLORS } from "../utils/getData";
import { topProducts } from "../utils/getData";
import { revenueByRegion } from "../utils/getData";
import StatCard from "../components/StatCard/StatCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const fmtCurrency = (v: number) => `$ ${v.toLocaleString()}`;

const DashBoard = () => {
  // Key metrics
  const { totalRevenue, totalOrders, avgOrderValue, activeCustomers } = KPIS;
  const KPIList = [
    {
      label: "Total Revenue",
      value: "$" + totalRevenue.toString() + " USD",
      hint: "Last 24 hours",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      hint: "Last 24 hours",
    },
    {
      label: "Average Order Value",
      value: "$" + avgOrderValue.toString() + " USD",
      hint: "Last 24 hours",
    },
    {
      label: "Active Customers",
      value: activeCustomers.toString(),
      hint: "Last 24 hours",
    },
  ];

  const findMaxRevenueRegion = (
    revenueByRegion: { region: string; revenue: number }[]
  ) => {
    let maxRevenue = 0;
    let maxRegion = "";

    for (let i = 0; i < revenueByRegion.length; i++) {
      if (revenueByRegion[i].revenue > maxRevenue) {
        maxRevenue = revenueByRegion[i].revenue;
        maxRegion = revenueByRegion[i].region;
      }
    }

    return maxRegion;
  };

  // Example usage
  const mostRevenueRegion = findMaxRevenueRegion(revenueByRegion);

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 justify-items-center">
          {KPIList.map((item) => (
            <div
              key={item.label}
              className="transition-transform transform hover:-translate-y-1"
            >
              <StatCard
                label={item.label}
                value={item.value}
                hint={item.hint}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Sales: spans 2 cols on large screens */}
          <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm">
            <div className="text-lg font-semibold mb-4">Monthly Sales</div>
            <div className="w-full h-64 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlySales}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="orders"
                    stroke="#2563EB"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales By Category (pie) */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-lg font-semibold mb-4">Sales By Category</div>
            <div className="w-full h-64 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={80}
                    paddingAngle={4}
                    label
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Region (radar) */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-lg font-semibold mb-3">Revenue by Region</div>
            <div className="w-full h-48 md:h-50 lg:h-50">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={revenueByRegion}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="region" />
                  <PolarRadiusAxis tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => fmtCurrency(Number(value))}
                  />
                  <Radar
                    name="Revenue"
                    dataKey="revenue"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center mt-4">
              <div className="text-md font-semibold">
                Most Revenue in {mostRevenueRegion}
              </div>
            </div>
          </div>

          {/* Top Products: spans 2 cols on large screens */}
          <div className="bg-white rounded-lg p-4 shadow-sm lg:col-span-2">
            <div className="text-lg font-semibold mb-4">Top Products</div>
            <div className="w-full h-64 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DashBoard;
