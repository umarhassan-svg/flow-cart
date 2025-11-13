// src/components/forms/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/products");
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((err as any).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: "email" | "password") => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: "email" | "password") => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const getLabelClass = (field: "email" | "password") => {
    const hasValue = form[field].trim() !== "";
    const focused = isFocused[field];

    // Floating effect logic
    return `
      absolute left-2 transition-all duration-200 pointer-events-none
      ${
        hasValue || focused
          ? "top-0 text-sm text-blue-500"
          : "top-4 text-base text-gray-400"
      }
    `;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-6"
      aria-label="login form"
    >
      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          onBlur={() => handleBlur("email")}
          className="w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-1 text-gray-900 focus:outline-none focus:border-blue-500"
          autoComplete="email"
          required
        />
        <label htmlFor="email" className={getLabelClass("email")}>
          Email
        </label>
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          onFocus={() => handleFocus("password")}
          onBlur={() => handleBlur("password")}
          className="w-full border-b-2 border-gray-300 bg-transparent px-2 pt-6 pb-1 text-gray-900 focus:outline-none focus:border-blue-500"
          autoComplete="current-password"
          required
        />
        <label htmlFor="password" className={getLabelClass("password")}>
          Password
        </label>
      </div>

      {/* Error Message */}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
