import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  BrainCircuit,
  Users,
  FileText,
  CalendarDays,
  FolderGit2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const milestones = [
  {
    title: "Requirement Analysis",
    status: "Completed",
    color: "text-green-400",
  },
  {
    title: "System Design",
    status: "Completed",
    color: "text-green-400",
  },
  {
    title: "Frontend Development",
    status: "In Progress",
    color: "text-cyan-400",
  },
  {
    title: "Backend Development",
    status: "Pending",
    color: "text-slate-400",
  },
  {
    title: "AI Integration",
    status: "Pending",
    color: "text-slate-400",
  },
];

const suggestions = [
  "Implement authentication using JWT.",
  "Prepare MongoDB schema before backend APIs.",
  "Use Gemini API for roadmap generation.",
  "Split frontend into reusable components.",
];

export default function ProjectDashboard() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("currentProject"));

    if (saved) {
      setProject(saved);
    }
  }, []);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  const teamMembers =
    project.team === "Individual"
      ? [project.owner]
      : [project.owner, "Member 2", "Member 3", "Member 4"];

  const documents = [
    "Requirement Analysis",
    "Architecture Design",
    "ER Diagram",
    "Project Proposal",
  ];

  const activities = [
    "Project Created",
    "Requirements Generated",
    "Blueprint Generated",
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>

            <h1 className="text-4xl font-bold">{project.title}</h1>

            <p className="mt-2 text-slate-400">{project.description}</p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-4 text-center">
            <p className="text-sm text-slate-400">Project Status</p>

            <p className="mt-2 text-xl font-bold text-cyan-300">
              {project.status}
            </p>
          </div>
        </div>

        {/* Progress */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Overall Progress</h2>

            <span className="text-cyan-400 font-bold">65%</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"></div>
          </div>
        </div>

        {/* Overview */}

        <div className="grid gap-6 md:grid-cols-4">
          <OverviewCard
            icon={<FolderGit2 size={26} />}
            title="Modules"
            value="6"
          />

          <OverviewCard
            icon={<Clock3 size={26} />}
            title="Days Left"
            value="30"
          />

          <OverviewCard
            icon={<Users size={26} />}
            title="Team"
            value={teamMembers.length}
          />

          <OverviewCard
            icon={<BrainCircuit size={26} />}
            title="Domain"
            value={project.domain}
          />

          <OverviewCard
            icon={<FolderGit2 size={26} />}
            title="Difficulty"
            value={project.level}
          />

          <OverviewCard
            icon={<CheckCircle2 size={26} />}
            title="Completed"
            value="15%"
          />
        </div>

        {/* Main Grid */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {" "}
          {/* Roadmap */}
          <Card title="Project Roadmap" icon={<CalendarDays size={22} />}>
            <div className="space-y-4">
              {milestones.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3"
                >
                  <span>{item.title}</span>

                  <span className={`font-medium ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          {/* AI Suggestions */}
          <Card title="AI Suggestions" icon={<BrainCircuit size={22} />}>
            <div className="space-y-3">
              {suggestions.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-4"
                >
                  <Sparkles size={18} className="mt-1 text-cyan-400" />

                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </Card>
          {/* Team */}
          <Card title="Team Members" icon={<Users size={22} />}>
            <div className="grid gap-3">
              {teamMembers.map((member) => (
                <div
                  key={member || "Unknown"}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3"
                >
                  <span>{member || "Unknown"}</span>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </Card>
          {/* Documents */}
          <Card title="Project Documents" icon={<FileText size={22} />}>
            <div className="space-y-3">
              {documents.map((doc) => (
                <button
                  key={doc}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-slate-900"
                >
                  <span>{doc}</span>

                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </Card>
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card title="Recent Activity" icon={<Clock3 size={22} />}>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-4"
                  >
                    <CheckCircle2 size={18} className="text-green-400" />

                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-cyan-400/30 hover:bg-slate-900">
      <div className="mb-5 text-cyan-400">{icon}</div>

      <p className="text-slate-400">{title}</p>

      <h3 className="mt-3 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="text-cyan-400">{icon}</div>

        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      {children}
    </div>
  );
}
