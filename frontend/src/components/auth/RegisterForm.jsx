import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  School,
  Calendar,
} from "lucide-react";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Create Your Account</h1>

        <p className="mt-3 text-slate-400">
          Start building AI-powered academic projects.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,.08)]">
        {/* Full Name */}

        <label className="mb-2 block text-sm text-slate-300">Full Name</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <User className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* Email */}

        <label className="mb-2 block text-sm text-slate-300">Email</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Mail className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            type="email"
            required
            placeholder="john@gmail.com"
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* College */}

        <label className="mb-2 block text-sm text-slate-300">College</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <School className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            type="text"
            required
            placeholder="Malnad College of Engineering"
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* Department */}

        <label className="mb-2 block text-sm text-slate-300">Department</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <GraduationCap className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            type="text"
            required
            placeholder="Computer Science"
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* Year */}

        <label className="mb-2 block text-sm text-slate-300">Year</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Calendar className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            type="text"
            required
            placeholder="2nd Year"
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* Password */}

        <label className="mb-2 block text-sm text-slate-300">Password</label>

        <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Lock className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            type="password"
            placeholder="********"
            minLength={8}
            required
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* Confirm */}

        <label className="mb-2 block text-sm text-slate-300">
          Confirm Password
        </label>

        <div className="mb-7 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
          <Lock className="mr-3 h-5 w-5 text-cyan-400" />

          <input
            type="password"
            placeholder="********"
            required
            className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
          />
        </div>

        <button className="cursor-pointer w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 py-4 font-semibold text-white transition hover:scale-[1.02]">
          Create Account
        </button>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?
          <Link to="/login" className="ml-2 text-cyan-400 hover:text-cyan-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
