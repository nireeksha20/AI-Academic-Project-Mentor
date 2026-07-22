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
} from "lucide-react";
import { useParams } from "react-router-dom";
import FeasibilityCard from "../components/FeasibilityCard";
import ScopeCard from "../components/ScopeCard";
import TechnologyCard from "../components/TechnologyCard";
import TimelineCard from "../components/TimelineCard";
import RiskCard from "../components/RiskCard";
import { projectService } from "../services/projectService";

export default function ProjectDashboard() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  useEffect(() => {
    console.log("========== BLUEPRINT ==========");
    console.log(blueprint);
    console.log("Timeline:", blueprint?.timeline);
    console.log("Technology:", blueprint?.technology);
    console.log("Risk:", blueprint?.risk);
    console.log("===============================");
  }, [blueprint]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectById(id);
        setProject(response.data?.project);
        try {
          const blueprintResponse = await projectService.getBlueprint(id);

          if (blueprintResponse.success) {
            setBlueprint(blueprintResponse.data.blueprint);
          }
        } catch (err) {
          console.log("Blueprint not found yet.");
        }
      } catch (error) {
        console.error("Failed to fetch project details", error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  const milestones = blueprint
    ? [
        {
          title: "Feasibility Analysis",
          status: "Completed",
          color: "text-green-400",
        },
        {
          title: "Project Scope",
          status: "Completed",
          color: "text-green-400",
        },
        {
          title: "Technology Selection",
          status: "Completed",
          color: "text-green-400",
        },
        {
          title: "Development Timeline",
          status: "Completed",
          color: "text-green-400",
        },
        {
          title: "Implementation",
          status: "Pending",
          color: "text-yellow-400",
        },
      ]
    : [
        {
          title: "Generate AI Blueprint",
          status: "Pending",
          color: "text-yellow-400",
        },
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

        <div className="mb-10 grid gap-6 md:grid-cols-4">
          <OverviewCard
            icon={<BrainCircuit size={26} />}
            title="AI Blueprint"
            value={blueprint ? "Generated" : "Pending"}
          />

          <OverviewCard
            icon={<CheckCircle2 size={26} />}
            title="Current Phase"
            value={blueprint ? "Development" : "Planning"}
          />

          <OverviewCard
            icon={<FolderGit2 size={26} />}
            title="Difficulty"
            value={project.level}
          />

          <OverviewCard
            icon={<Users size={26} />}
            title="Team"
            value={project.team}
          />
        </div>

        {/* Main Grid */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {blueprint && (
            <div className="lg:col-span-2">
              <FeasibilityCard data={blueprint.feasibility} />
            </div>
          )}
          {blueprint && (
            <div className="lg:col-span-2">
              <ScopeCard data={blueprint.scope} />
            </div>
          )}{" "}
          {blueprint && (
            <div className="lg:col-span-2">
              <TimelineCard data={blueprint.timeline} />
            </div>
          )}
          {blueprint && <TechnologyCard data={blueprint.technology} />}
          {blueprint && <RiskCard data={blueprint.risk} />}
          <div className="lg:col-span-2">
            <Card title="AI Agent Pipeline" icon={<BrainCircuit size={22} />}>
              <div className="grid gap-4 md:grid-cols-3">
                <PipelineStep title="Student Profile" status="Completed" />

                <PipelineStep title="Feasibility Agent" status="Completed" />

                <PipelineStep title="Scope Agent" status="Completed" />

                <PipelineStep title="Technology Agent" status="Completed" />

                <PipelineStep title="Timeline Agent" status="Completed" />

                <PipelineStep title="Risk Agent" status="Completed" />

                <PipelineStep title="Documentation Agent" status="Completed" />
              </div>
            </Card>
          </div>
          {/* Team */}
          <Card title="Project Team" icon={<Users size={22} />}>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
              <p className="text-lg font-semibold">{project.team}</p>

              <p className="mt-2 text-slate-400">
                {project.team === "Individual"
                  ? "This is an individual project."
                  : "Team collaboration is enabled."}
              </p>
            </div>
          </Card>
          {/* Documents */}
          <Card title="Project Documents" icon={<FileText size={22} />}>
            {blueprint ? (
              <div className="space-y-3">
                <button className="flex w-full items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3 transition hover:border-cyan-400">
                  <span>📘 AI Blueprint Report</span>

                  <span className="text-sm text-cyan-400">Coming Soon</span>
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-400">
                Generate an AI Blueprint to unlock project documents.
              </div>
            )}
          </Card>
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card title="Recent Activity" icon={<Clock3 size={22} />}>
              <div className="space-y-4">
                <ActivityItem text="Project created successfully." />

                {blueprint ? (
                  <ActivityItem text="AI Blueprint generated." />
                ) : (
                  <ActivityItem text="Waiting for AI Blueprint generation." />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-4">
      <CheckCircle2 size={18} className="text-green-400" />

      <span>{text}</span>
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

function PipelineStep({ title, status }) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
      <p className="font-semibold">{title}</p>

      <p className="mt-2 text-sm text-emerald-400">✓ {status}</p>
    </div>
  );
}
