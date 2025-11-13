import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/images/logo2.jpg";
import { FaOpencart } from "react-icons/fa";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 p-4">
      {/* Card */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white justify-center items-center">
          <div className="w-full h-full">
            <img
              src={logo}
              alt="FlowCart Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - contains header, small-screen logo and the form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center md:justify-start mb-4 gap-3">
            <span className="flex items-center text-blue-600">
              <FaOpencart size={34} />
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 text-center md:text-left">
              Flow<span className="text-blue-600">Cart</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Sign In
          </h1>

          {/* Form wrapper: centers on small screens, aligns left on larger */}
          <div className="w-full flex justify-center md:justify-start">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
