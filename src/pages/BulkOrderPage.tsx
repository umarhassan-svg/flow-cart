// src/pages/BulkOrderPage.tsx
import React from "react";
import Layout from "../components/layouts/layout-sidemenu";
import BulkOrderComp from "../components/BulkOrderComp/BulkOrderComp";
const BulkOrderPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center w-full py-8">
        {/* Container to keep both sections centered */}
        <div className="grid grid-cols-1 md:grid-cols-1  w-full max-w-4xl">
          {/* ✅ Left Side: Bulk Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Bulk Orders</h1>
              <p className="text-sm text-gray-500">
                Upload a .csv file to create multiple items
              </p>
            </div>

            <BulkOrderComp />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BulkOrderPage;
