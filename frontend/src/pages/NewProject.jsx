import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../services/projectService";
import {
  Sparkles,
  FolderPlus,
  Layers3,
  Users,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

export default function NewProject() {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    domain: "",
    level: "Beginner",
    team: "Individual",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  function handleSuggestion(title) {
    setProject((prev) => ({
      ...prev,
      title,
    }));
  }

  async function handleGenerate() {
    if (
      !project.title.trim() ||
      !project.domain.trim() ||
      !project.description.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

      try {
        const response = await projectService.createProject({
          title: project.title,
          domain: project.domain,
          level: project.level,
          team: project.team,
          description: project.description,
        });

        const newProject = response.data?.project;
        if (newProject?._id) {
          navigate(`/requirements/${newProject._id}`);
        } else {
          throw new Error("Project ID not found in response.");
        }
      } catch (error) {
      console.error("Failed to create project:", error);
      alert(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  const suggestions = [
    "AI Academic Project Mentor",
    "Smart Attendance System",
    "AI Resume Analyzer",
    "Campus Placement Portal",
    "Hospital Management System",
    "Food Waste Management",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Header */}

        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-cyan-400 font-semibold uppercase tracking-widest">
              New Project
            </p>

            <h1 className="mt-3 text-5xl font-bold">Create Your AI Project</h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Describe your software idea and let AI generate a complete
              development blueprint including architecture, roadmap, database
              design and implementation guidance.
            </p>
          </div>

          <div className="hidden rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6 lg:block">
            <Sparkles className="h-12 w-12 text-cyan-400" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left */}

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="mb-8 text-2xl font-semibold">Project Details</h2>

            {/* Project Name */}

            <label className="mb-2 block text-sm text-slate-300">
              Project Name *
            </label>

            <div className="mb-6 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
              <FolderPlus className="mr-3 h-5 w-5 text-cyan-400" />

              <input
                type="text"
                name="title"
                required
                value={project.title}
                onChange={handleChange}
                placeholder="AI Academic Project Mentor"
                className="w-full bg-transparent py-4 outline-none text-white placeholder:text-slate-500"
              />
            </div>

            {/* Domain */}

            <label className="mb-2 block text-sm text-slate-300">
              Project Domain *
            </label>

            <div className="mb-6 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
              <Layers3 className="mr-3 h-5 w-5 text-cyan-400" />

              <select
                required
                name="domain"
                value={project.domain}
                onChange={handleChange}
                className="w-full bg-transparent py-4 outline-none text-white"
              >
                <option className="bg-slate-900">Select Domain</option>
                <option className="bg-slate-900">
                  Artificial Intelligence
                </option>
                <option className="bg-slate-900">Web Development</option>
                <option className="bg-slate-900">Mobile Application</option>
                <option className="bg-slate-900">Cyber Security</option>
                <option className="bg-slate-900">IoT</option>
                <option className="bg-slate-900">Cloud Computing</option>
              </select>
            </div>

            {/* Difficulty */}

            <label className="mb-2 block text-sm text-slate-300">
              Difficulty
            </label>

            <div className="mb-6">
              <select
                name="level"
                value={project.level}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none"
              >
                <option className="bg-slate-900">Beginner</option>
                <option className="bg-slate-900">Intermediate</option>
                <option className="bg-slate-900">Advanced</option>
              </select>
            </div>

            {/* Team */}

            <label className="mb-2 block text-sm text-slate-300">
              Team Size
            </label>

            <div className="mb-6 flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
              <Users className="mr-3 h-5 w-5 text-cyan-400" />

              <select
                name="team"
                value={project.team}
                onChange={handleChange}
                className="w-full bg-transparent py-4 outline-none text-white"
              >
                <option className="bg-slate-900">Individual</option>
                <option className="bg-slate-900">2 Members</option>
                <option className="bg-slate-900">3 Members</option>
                <option className="bg-slate-900">4 Members</option>
                <option className="bg-slate-900">5+ Members</option>
              </select>
            </div>

            {/* Description */}

            <label className="mb-2 block text-sm text-slate-300">
              Project Description *
            </label>

            <textarea
              required
              rows={6}
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Example:
Develop an AI-powered mentor that guides students through software project development by generating architecture, roadmap, database schema and implementation steps."
              className="mb-8 w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-white outline-none placeholder:text-slate-500"
            />

            {project.title && (
              <div className="mb-8 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                <h3 className="mb-3 font-semibold text-cyan-300">
                  Project Preview
                </h3>

                <p>
                  <span className="text-slate-400">Title:</span> {project.title}
                </p>

                <p>
                  <span className="text-slate-400">Domain:</span>{" "}
                  {project.domain || "-"}
                </p>

                <p>
                  <span className="text-slate-400">Difficulty:</span>{" "}
                  {project.level}
                </p>

                <p>
                  <span className="text-slate-400">Team:</span> {project.team}
                </p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 font-semibold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <BrainCircuit size={22} />

              {loading ? "Generating..." : "Generate AI Blueprint"}

              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="mb-6 text-2xl font-semibold">Suggested Ideas</h2>

            <div className="space-y-4">
              {suggestions.map((idea) => (
                <button
                  key={idea}
                  onClick={() => handleSuggestion(idea)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-left transition hover:border-cyan-400 hover:bg-cyan-500/10"
                >
                  <div>
                    <p className="font-medium">{idea}</p>

                    <p className="mt-1 text-xs text-slate-400">
                      Click to use this project title
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <h3 className="mb-3 font-semibold text-cyan-300">
                AI Mentor Recommendation
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                The more detailed your project description, the better the AI
                can generate architecture, roadmap, database schema, API
                structure and learning resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
