import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  BrainCircuit,
  Users,
  FolderGit2,
  Cpu,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import FeasibilityCard from "../components/FeasibilityCard";
import ScopeCard from "../components/ScopeCard";
import TechnologyCard from "../components/TechnologyCard";
import TimelineCard from "../components/TimelineCard";
import RiskCard from "../components/RiskCard";
import { projectService } from "../services/projectService";
import AgentAccordion from "../components/AgentAccordion";
import MentorCard from "../components/MentorCard";
import { useLayoutEffect } from "react";
import ProjectProgressCard from "../components/ProjectProgressCard";

export default function ProjectDashboard() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [docType, setDocType] = useState(null);
  const [docContent, setDocContent] = useState(null);
  const [docLoading, setDocLoading] = useState(false);

  const handleGenerateDocumentation = async (type) => {
  try {
    setDocLoading(true);
    setDocType(type);
    const res = await projectService.generateDocumentation(project._id, type);
    setDocContent(res.data.doc.content);
  } catch (err) {
    console.error(err);
    alert("Failed to generate documentation.");
  } finally {
    setDocLoading(false);
  }
};

  const handleGenerateBlueprint = async () => {
    try {
      setGenerating(true);

      await projectService.generateBlueprint(id);

      const [projectRes, blueprintRes] = await Promise.all([
        projectService.getProjectById(id),
        projectService.getBlueprint(id),
      ]);

      setProject(projectRes.data.project);

      if (blueprintRes.success) {
        setBlueprint(blueprintRes.data.blueprint);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate blueprint.");
    } finally {
      setGenerating(false);
    }
  };

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

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
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>

        <p className="mt-4 text-slate-400">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* Header */}

        <div className="mb-6 flex items-start justify-between">
          <div>
            <Link
              to="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight">
              {project.title}
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-400 max-w-4xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="min-w-[170px] rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-5 text-center">
              <p className="text-sm font-semibold tracking-wide text-slate-300">
                Project Status
              </p>

              <p className="mt-3 text-2xl font-bold text-cyan-300">
                {project.status}
              </p>
            </div>

            <button
              onClick={handleGenerateBlueprint}
              disabled={generating}
              className={`w-[190px] rounded-xl py-3 font-semibold transition ${
                blueprint
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              } disabled:opacity-50`}
            >
              {generating
                ? "AI is analyzing..."
                : blueprint
                  ? "Regenerate Blueprint"
                  : "Generate AI Blueprint"}
            </button>
          </div>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-4">
          <OverviewCard
            icon={<BrainCircuit size={22} />}
            title="Blueprint Status"
            value={blueprint?.status || "Pending"}
          />

          <OverviewCard
            icon={<CheckCircle2 size={22} />}
            title="Overall Score"
            value={
              blueprint ? `${blueprint.feasibility?.feasibility_score}/10` : "-"
            }
          />

          <OverviewCard
            icon={<FolderGit2 size={22} />}
            title="Difficulty"
            value={project.level}
          />

          <OverviewCard
            icon={<Clock size={22} />}
            title="Duration"
            value={blueprint?.timeline?.estimated_duration ?? "-"}
          />
        </div>

        {/* Main Grid */}

        <div className="mt-10 flex flex-col gap-6">
          {blueprint && (
            <AgentAccordion
              title="Project Feasibility"
              icon={<CheckCircle2 className="text-cyan-400" />}
            >
              <FeasibilityCard data={blueprint.feasibility} />
            </AgentAccordion>
          )}
          {blueprint?.status === "Needs Clarification" && (
            <div className="lg:col-span-2">
              <ClarificationCard feasibility={blueprint.feasibility} />
            </div>
          )}

          {blueprint?.scope && (
            <AgentAccordion
              title="Project Scope"
              icon={<FolderGit2 className="text-cyan-400" />}
            >
              <ScopeCard data={blueprint.scope} />
            </AgentAccordion>
          )}
          {blueprint?.technology && (
            <AgentAccordion
              title="Technology Stack"
              icon={<Cpu className="text-cyan-400" />}
            >
              <TechnologyCard data={blueprint.technology} />
            </AgentAccordion>
          )}
          {blueprint?.timeline && (
            <AgentAccordion
              title="Development Timeline"
              icon={<Clock className="text-cyan-400" />}
            >
              <TimelineCard data={blueprint.timeline} />
            </AgentAccordion>
          )}
          {blueprint?.risk && (
            <AgentAccordion
              title="Risk Assessment"
              icon={<AlertTriangle className="text-cyan-400" />}
            >
              <RiskCard data={blueprint.risk} />
            </AgentAccordion>
          )}

          <div>
            {blueprint && (
              <Card title="Blueprint Summary" icon={<BrainCircuit size={20} />}>
                {/* Verdict */}
                <SummaryCard
                  title="Verdict"
                  value={blueprint.feasibility?.verdict}
                  color="text-emerald-400"
                  fullWidth
                />

                {/* Other metrics */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <SummaryCard title="Difficulty" value={project.level} />

                  <SummaryCard
                    title="Duration"
                    value={blueprint.timeline?.estimated_duration}
                  />

                  <SummaryCard
                    title="Industry Value"
                    value={
                      blueprint.feasibility?.industry_value != null
                        ? `${blueprint.feasibility.industry_value}/10`
                        : "-"
                    }
                  />

                  <SummaryCard
                    title="Portfolio Value"
                    value={`${blueprint.feasibility?.portfolio_value}/10`}
                  />
                </div>

                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SummaryCard
                    title="Overall Score"
                    value={`${blueprint.feasibility?.feasibility_score}/10`}
                    color="text-cyan-400"
                  />
                </div>
              </Card>
            )}
          </div>
          {/* Team */}
          <Card title="Project Team" icon={<Users size={22} />}>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
              <p className="text-sm font-semibold">{project.team}</p>

              <p className="mt-2 text-slate-400">
                {project.team === "Individual"
                  ? "This is an individual project."
                  : "Team collaboration is enabled."}
              </p>
            </div>
          </Card>

          {/* Documents */}
<Card title="Project Documents" icon={<BrainCircuit size={22} />}>
  {blueprint ? (
    <div className="space-y-3">
      {["synopsis", "methodology", "progress_report"].map((type) => (
        <button
          key={type}
          onClick={() => handleGenerateDocumentation(type)}
          disabled={docLoading}
          className="flex w-full items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3 transition hover:border-cyan-400 disabled:opacity-50"
        >
          <span className="capitalize">
            {docLoading && docType === type
              ? "Generating..."
              : `📘 ${type.replace("_", " ")}`}
          </span>
        </button>
      ))}

      {docContent && (
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 p-6 prose prose-invert max-w-none">
          <ReactMarkdown>{docContent}</ReactMarkdown>
        </div>
      )}
    </div>
  ) : (
    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-400">
      Generate an AI Blueprint to unlock project documents.
    </div>
  )}
</Card>
          {/* Documents */}
          {/* <Card title="Project Documents" icon={<FileText size={22} />}>
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
          </Card> */}

          <Card title="Project Progress" icon={<CheckCircle2 size={22} />}>
            <ProjectProgressCard projectId={project._id} />
          </Card>

          <Card
            title="AI Conversational Mentor"
            icon={<BrainCircuit size={22} />}
          >
            <div className="mb-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <p className="text-sm leading-7 text-slate-300">
                Need guidance while building your project? Ask your AI faculty
                mentor about implementation, debugging, architecture, planning,
                or your next development step. Recommendations are generated
                using your approved blueprint, current progress, and project
                constraints.
              </p>
            </div>
            <MentorCard
              projectId={project._id}
              project={project}
              blueprint={blueprint}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-4">
      <CheckCircle2 size={18} className="text-green-400" />

      <span className="text-base text-slate-400">{text}</span>
    </div>
  );
}

function OverviewCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-cyan-400/30 hover:bg-slate-900">
      <div className="mb-4 text-cyan-400">{icon}</div>

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-semibold text-white">{value}</h3>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="mb-6 flex items-center gap-3">
        <div className="text-cyan-400">{icon}</div>

        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      </div>

      {children}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color = "text-slate-300",
  fullWidth = false,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
      <h3 className="text-sm font-bold uppercase tracking-wide text-white">
        {title}
      </h3>

      <p className={`mt-3 text-base leading-7 ${color}`}>{value || "-"}</p>
    </div>
  );
}

function PipelineStep({ title, status, onClick }) {
  const completed = status === "Completed";

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-5 text-left transition hover:scale-[1.02] ${
        completed
          ? "border-emerald-500/20 bg-emerald-500/10"
          : "border-yellow-500/20 bg-yellow-500/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold">{title}</p>

        <span
          className={`rounded-full px-2 py-1 text-xs ${
            completed
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {completed ? "Done" : "Pending"}
        </span>
      </div>

      <p
        className={`mt-2 text-sm ${
          completed ? "text-emerald-400" : "text-yellow-400"
        }`}
      >
        {completed ? "✓ Completed" : "⏳ Pending"}
      </p>
    </button>
  );
}

function ClarificationCard({ feasibility }) {
  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-8">
      <h2 className="text-lg font-semibold text-yellow-300">
        Clarification Required
      </h2>

      <p className="mt-3 text-slate-300">
        Your project idea is too broad to generate a complete AI blueprint.
      </p>

      <p className="mt-5 text-sm font-medium text-white">
        Suggestions from the AI
      </p>

      <ul className="mt-3 list-disc space-y-2 pl-6">
        {feasibility?.suggestions?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-900/60 p-5">
        <p className="font-semibold text-cyan-300">Next Step</p>

        <p className="mt-2 text-slate-300">
          Refine your project idea based on the suggestions above, then
          regenerate the AI Blueprint.
        </p>
      </div>
    </div>
  );
}
