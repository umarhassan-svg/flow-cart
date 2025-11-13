import Layout from "../components/layouts/layout-sidemenu";

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <div>
          <h1 className="text-3xl font-bold underline text-center mt-20 text-gray-800">
            Welcome to FlowCart Home Page
          </h1>
        </div>
      </Layout>
    </>
  );
};

export default Home;
