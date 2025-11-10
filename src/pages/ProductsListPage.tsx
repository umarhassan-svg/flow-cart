import LayoutSideMenu from "../components/layouts/layout-sidemenu";

export const ProductsListPage = () => {
  return (
    <LayoutSideMenu>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products List</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-600">
          Your product list and content will go here.
        </p>
      </div>
    </LayoutSideMenu>
  );
};

export default ProductsListPage;
