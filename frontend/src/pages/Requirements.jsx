import { useEffect, useState } from "react";
import { CheckCircle2, BrainCircuit, Database, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Requirements() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("currentProject"));

    if (stored) {
      setProject(stored);
    }
  }, []);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading Project...
      </div>
    );
  }

  const functionalRequirements = [
    "User Authentication",
    "Project Idea Submission",
    "AI Project Analysis",
    "Roadmap Generation",
    "Architecture Recommendation",
    "Learning Resources",
  ];

  const technologies = [
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Gemini API",
  ];

  const databaseCollections = [
    "Users",
    "Projects",
    "Requirements",
    "Roadmaps",
    "Resources",
  ];

  const architecture = [
    "React Frontend",
    "REST API",
    "Node.js Backend",
    "AI Service",
    "MongoDB",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Header */}

        <div className="mb-12">
          <p className="font-semibold uppercase tracking-widest text-cyan-400">
            AI Generated Blueprint
          </p>

          <h1 className="mt-3 text-5xl font-bold">{project.title}</h1>

          <p className="mt-5 max-w-3xl text-lg text-slate-400">
            {project.description}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            <InfoCard title="Domain" value={project.domain} />

            <InfoCard title="Difficulty" value={project.level} />

            <InfoCard title="Team" value={project.team} />

            <InfoCard title="Status" value={project.status} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Functional */}

          <Card
            icon={<CheckCircle2 className="text-cyan-400" />}
            title="Functional Requirements"
            items={functionalRequirements}
          />

          {/* AI */}

          <Card
            icon={<BrainCircuit className="text-cyan-400" />}
            title="AI Suggestions"
            items={technologies}
          />

          {/* DB */}

          <Card
            icon={<Database className="text-cyan-400" />}
            title="Database Collections"
            items={databaseCollections}
          />

          {/* Architecture */}

          <Card
            icon={<Code2 className="text-cyan-400" />}
            title="System Architecture"
            items={architecture}
          />
        </div>

        <div className="mt-12 flex justify-between">
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 px-8 py-4 transition hover:bg-white/5"
          >
            ← Dashboard
          </Link>

          <Link
            to="/project-dashboard"
            className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 font-semibold transition hover:scale-105"
          >
            Continue to Project Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold">
        {icon}
        {title}
      </h2>

      <ul className="space-y-4 text-slate-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-2 text-xl font-semibold text-cyan-300">{value}</h3>
    </div>
  );
}
