import { useState } from "react";
import { authService } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  Code2,
  Database,
  BrainCircuit,
  Server,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function SkillAssessment() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    programming: "",
    frontend: "",
    backend: "",
    database: "",
    ai: "",
    experience: "",
    role: "",

    interests: [],
    preferredTech: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleInterestChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, value],
      });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((item) => item !== value),
      });
    }
  }

  useEffect(() => {
    if (!user?.skillAssessment) return;

    setFormData({
      programming: user.skillAssessment.programming || "",
      frontend: user.skillAssessment.frontend || "",
      backend: user.skillAssessment.backend || "",
      database: user.skillAssessment.database || "",
      ai: user.skillAssessment.ai || "",
      experience: user.skillAssessment.experience || "",
      role: user.skillAssessment.role || "",

      interests: user.skillAssessment.interests || [],

      preferredTech: user.skillAssessment.preferredTech || "",
    });
  }, [user]);

  async function saveAssessment() {
    const requiredFields = [
      "programming",
      "frontend",
      "backend",
      "database",
      "ai",
      "experience",
      "role",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Please complete all required fields.");
        return;
      }
    }

    try {
      const response = await authService.updateSkillAssessment({
        programming: formData.programming,
        frontend: formData.frontend,
        backend: formData.backend,
        database: formData.database,
        ai: formData.ai,
        experience: formData.experience,
        role: formData.role,
        interests: formData.interests,
        preferredTech: formData.preferredTech,
      });

      updateUser(response.data.data.user);

      navigate("/dashboard");

      alert("Skill Assessment Saved Successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save assessment.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-8 py-12">
        {/* Header */}

        <div className="mb-10">
          <p className="font-semibold uppercase tracking-widest text-cyan-400">
            Student Onboarding
          </p>

          <h1 className="mt-3 text-5xl font-bold">Skill Assessment</h1>

          <p className="mt-4 max-w-3xl text-slate-400">
            Tell us about your technical background so our AI Mentor can
            personalize project recommendations, learning paths, and
            implementation guidance.
          </p>
        </div>

        {/* Progress */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span>Assessment Progress</span>

            <span className="font-semibold text-cyan-400">Step 1 of 1</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"></div>
          </div>
        </div>

        {/* Form */}

        <div className="grid gap-8 md:grid-cols-2">
          <SelectCard
            icon={<Code2 />}
            title="Programming Skills"
            name="programming"
            value={formData.programming}
            onChange={handleChange}
          />

          <SelectCard
            icon={<GraduationCap />}
            title="Frontend Development"
            name="frontend"
            value={formData.frontend}
            onChange={handleChange}
          />

          <SelectCard
            icon={<Server />}
            title="Backend Development"
            name="backend"
            value={formData.backend}
            onChange={handleChange}
          />

          <SelectCard
            icon={<Database />}
            title="Database Knowledge"
            name="database"
            value={formData.database}
            onChange={handleChange}
          />

          <SelectCard
            icon={<BrainCircuit />}
            title="AI / Machine Learning"
            name="ai"
            value={formData.ai}
            onChange={handleChange}
          />

          {/* Experience */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <label className="mb-3 block text-lg font-semibold">
              Development Experience
            </label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 outline-none"
            >
              <option value="">Select Experience</option>

              <option>0-6 Months</option>

              <option>6-12 Months</option>

              <option>1-2 Years</option>

              <option>2+ Years</option>
            </select>
          </div>

          {/* Preferred Role */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <label className="mb-3 block text-lg font-semibold">
              Preferred Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 outline-none"
            >
              <option value="">Select Role</option>

              <option>Frontend Developer</option>

              <option>Backend Developer</option>

              <option>Full Stack Developer</option>

              <option>AI Engineer</option>

              <option>Data Scientist</option>

              <option>Software Engineer</option>
            </select>
          </div>
        </div>
        {/* Areas of Interest */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="mb-6 text-2xl font-semibold">Areas of Interest</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Web Development",
              "Artificial Intelligence",
              "Machine Learning",
              "Cyber Security",
              "Cloud Computing",
              "Data Science",
              "Mobile Development",
              "UI / UX Design",
              "DevOps",
            ].map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-cyan-400/40"
              >
                <input
                  type="checkbox"
                  value={item}
                  checked={formData.interests.includes(item)}
                  onChange={handleInterestChange}
                  className="h-4 w-4 accent-cyan-400"
                />

                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Tech Stack */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="mb-6 text-2xl font-semibold">Preferred Tech Stack</h2>

          <textarea
            rows={4}
            name="preferredTech"
            value={formData.preferredTech}
            onChange={handleChange}
            placeholder="Example: MERN Stack, Python + Flask, React + Firebase..."
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 outline-none transition focus:border-cyan-400"
          />
        </div>

        {/* AI Preview */}

        <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8">
          <h2 className="mb-5 flex items-center gap-3 text-2xl font-semibold">
            <BrainCircuit className="text-cyan-400" />
            AI Recommendation Preview
          </h2>

          <ul className="space-y-3 text-slate-300">
            <li>• Personalized project recommendations</li>

            <li>• AI-generated software architecture</li>

            <li>• Technology stack suggestions</li>

            <li>• Learning roadmap based on your skills</li>

            <li>• Resource recommendations</li>
          </ul>
        </div>

        {/* Buttons */}

        <div className="mt-12 flex flex-wrap justify-between gap-4">
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 px-8 py-4 transition hover:bg-white/5"
          >
            Back to Dashboard
          </Link>

          <button
            onClick={saveAssessment}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 font-semibold transition hover:scale-105"
          >
            Save Assessment
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENT ---------------- */

function SelectCard({ icon, title, name, value, onChange }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-cyan-400">{icon}</div>

        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 outline-none transition focus:border-cyan-400"
      >
        <option value="">Select Level</option>

        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
}
