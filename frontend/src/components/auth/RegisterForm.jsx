import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  School,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Save profile for frontend demo
    const profile = {
      name: formData.fullName,
      email: formData.email,
      college: formData.college,
      department: formData.department,
      year: formData.year,
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    }, 1000);
  }

  return (
    <div className="w-full max-w-xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Create Your Account</h1>

        <p className="mt-3 text-slate-400">
          Start building AI-powered academic projects.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,.08)]"
      >
        {/* Full Name */}

        <label className="mb-2 block text-sm text-slate-300">Full Name *</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <User className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            type="text"
            placeholder="John Doe"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Email */}

        <label className="mb-2 block text-sm text-slate-300">Email *</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Mail className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            type="email"
            placeholder="john@gmail.com"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* College */}

        <label className="mb-2 block text-sm text-slate-300">College *</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <School className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            name="college"
            value={formData.college}
            onChange={handleChange}
            type="text"
            placeholder="Malnad College of Engineering"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Department */}

        <label className="mb-2 block text-sm text-slate-300">
          Department *
        </label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <GraduationCap className="mr-3 h-5 w-5 text-cyan-400" />

          <select
            required
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-transparent py-4 text-white outline-none"
          >
            <option value="" className="bg-slate-900">
              Select Department
            </option>
            <option className="bg-slate-900">Computer Science</option>
            <option className="bg-slate-900">Information Science</option>
            <option className="bg-slate-900">Electronics</option>
            <option className="bg-slate-900">Mechanical</option>
            <option className="bg-slate-900">Civil</option>
          </select>
        </div>

        {/* Year */}

        <label className="mb-2 block text-sm text-slate-300">Year *</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Calendar className="mr-3 h-5 w-5 text-cyan-400" />

          <select
            required
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full bg-transparent py-4 text-white outline-none"
          >
            <option value="" className="bg-slate-900">
              Select Year
            </option>
            <option className="bg-slate-900">1st Year</option>
            <option className="bg-slate-900">2nd Year</option>
            <option className="bg-slate-900">3rd Year</option>
            <option className="bg-slate-900">4th Year</option>
          </select>
        </div>

        {/* Password */}

        <label className="mb-2 block text-sm text-slate-300">Password *</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Lock className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            type={showPassword ? "text" : "password"}
            minLength={8}
            placeholder="********"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm */}

        <label className="mb-2 block text-sm text-slate-300">
          Confirm Password *
        </label>

        <div className="mb-7 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Lock className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            type={showConfirm ? "text" : "password"}
            placeholder="********"
            className="w-full bg-transparent py-4 text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="text-slate-400"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 py-4 font-semibold text-white transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?
          <Link to="/login" className="ml-2 text-cyan-400 hover:text-cyan-300">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
