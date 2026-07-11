import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = React.useContext(AuthContext);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = {};
        error.response.data.errors.forEach((err) => {
          errors[err.field] = err.message;
        });
        setFormErrors(errors);
      } else {
        setFormErrors({ global: error.response?.data?.message || "Login failed" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

        <p className="mt-3 text-slate-400">
          Login to continue building your AI-powered academic projects.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,.08)]"
      >
        {/* Email */}

        <label className="mb-2 block text-sm text-slate-300">Email *</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Mail className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            autoComplete="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>
        {formErrors.email && <p className="mt-1 mb-4 text-sm text-red-500">{formErrors.email}</p>}

        {/* Password */}

        <label className="mb-2 block text-sm text-slate-300">Password *</label>

        <div className="mb-2 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Lock className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 transition hover:text-cyan-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formErrors.password && <p className="mt-1 mb-2 text-sm text-red-500">{formErrors.password}</p>}

        <div className="mb-7 flex justify-end">
          <button
            type="button"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Forgot Password?
          </button>
        </div>
        
        {formErrors.global && <p className="mb-4 text-center text-sm text-red-500">{formErrors.global}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 py-4 font-semibold text-white transition hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?
          <Link
            to="/register"
            className="ml-2 text-cyan-400 hover:text-cyan-300"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
