import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectService } from "../services/projectService";
import { CheckCircle2 } from "lucide-react";
import EmptyBlueprint from "../components/EmptyBlueprint";

export default function Requirements() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loadingBlueprint, setLoadingBlueprint] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectById(id);
        setProject(response.data.project);

        try {
          const blueprintResponse = await projectService.getBlueprint(id);

          if (blueprintResponse.success) {
            setBlueprint(blueprintResponse.data.blueprint);
          }
        } catch (err) {
          // No blueprint yet
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingBlueprint(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        Loading Project...
      </div>
    );
  }

  const handleGenerateBlueprint = async () => {
    try {
      setGenerating(true);

      const response = await projectService.generateBlueprint(id);

      if (response.success) {
        const updated = await projectService.getProjectById(id);
        setProject(updated.data.project);

        const blueprintResponse = await projectService.getBlueprint(id);
        setBlueprint(blueprintResponse.data.blueprint);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const feasibility = blueprint?.feasibility || "Not generated";

  const scope = blueprint?.scope || "Not generated";

  const technology = blueprint?.technology || "Not generated";

  const timeline = blueprint?.timeline || "Not generated";

  const risk = blueprint?.risk || "Not generated";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1500px] px-8 py-12">
        {/* Header */}

        <div className="mb-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-10">
          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            AI PROJECT BLUEPRINT
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight">
            {project.title}
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge>{project.domain}</Badge>

            <Badge>{project.level}</Badge>

            <Badge>{project.team}</Badge>

            <Badge>{project.status}</Badge>

            {project.blueprintVersion > 0 && (
              <Badge>Version {project.blueprintVersion}</Badge>
            )}
          </div>

          {project.blueprintGeneratedAt && (
            <p className="mt-5 text-sm text-slate-400">
              Last generated on{" "}
              <span className="text-cyan-300">
                {new Date(project.blueprintGeneratedAt).toLocaleString()}
              </span>
            </p>
          )}

          {/* Show only after first generation */}

          {blueprint && !loadingBlueprint && (
            <button
              onClick={handleGenerateBlueprint}
              disabled={generating}
              className="mt-8 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30"
            >
              🔄 Regenerate Blueprint
            </button>
          )}
        </div>

        {/* Main Content */}

        {generating ? (
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-16 text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>

            <h2 className="mt-8 text-3xl font-bold">
              AI Agents are generating your blueprint...
            </h2>

            <p className="mt-4 text-slate-400">
              Student Profile → Feasibility → Scope → Technology → Timeline →
              Risk → Documentation
            </p>
          </div>
        ) : blueprint ? (
          <div className="rounded-3xl border border-emerald-500/20 bg-slate-900 p-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle2 size={42} className="text-emerald-400" />
            </div>

            <h2 className="mt-8 text-4xl font-bold">
              AI Blueprint Generated Successfully
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
              Your AI agents successfully analyzed the project and generated a
              complete implementation blueprint.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Badge>Feasibility</Badge>

              <Badge>Scope</Badge>

              <Badge>Technology</Badge>

              <Badge>Timeline</Badge>

              <Badge>Risk</Badge>

              <Badge>Documentation</Badge>
            </div>
          </div>
        ) : (
          <EmptyBlueprint
            onGenerate={handleGenerateBlueprint}
            generating={generating}
          />
        )}

        {/* Footer */}

        <div
          className={`mt-12 flex ${
            blueprint ? "justify-between" : "justify-start"
          }`}
        >
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 px-8 py-4 transition hover:scale-105 hover:bg-slate-800"
          >
            ← Dashboard
          </Link>

          {blueprint && (
            <Link
              to={`/project-dashboard/${project._id}`}
              className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30"
            >
              Continue to Project Dashboard →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
      {children}
    </span>
  );
}
