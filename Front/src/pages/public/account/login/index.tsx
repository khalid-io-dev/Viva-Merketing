import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../../services/AuthService"; // Verify this path

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", response);
      navigate(authService.isAdmin() ? "/admin/dashboard" : "/");
    } catch (err: any) {
      try {
        const errorData = JSON.parse(err.message);
        setErrors(errorData);
      } catch {
        setErrors({ general: err.message || "Login failed. Please check your credentials." });
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow justify-center items-center bg-gray-50 px-6 py-4 lg:px-8 box-border w-full">
      <div className="sm:mx-auto sm:w-full">
        <h1 className="text-center text-5xl md:text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h1>
      </div>

      <div className="sm:mx-auto sm:w-full mt-6 w-full max-w-3xl">
        {errors.general && (
          <div className="mb-4 text-red-600 text-center">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label htmlFor="email" className="block text-2xl md:text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="Email address"
                required
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                disabled={loading}
              />
              {errors.email && (
                <div className="mt-1 text-red-600 text-sm">{errors.email}</div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-2xl md:text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-2xl md:text-sm text-emerald-600 hover:text-emerald-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2.5">
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Password"
                required
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                disabled={loading}
              />
              {errors.password && (
                <div className="mt-1 text-red-600 text-sm">{errors.password}</div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="block w-full rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition disabled:bg-emerald-400"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-2xl md:text-sm text-gray-600">
          Not a member?{" "}
          <Link to="/registration" className="text-emerald-600 hover:text-emerald-700">
            Click here to register!
          </Link>
        </p>
      </div>
    </div>
  );
}