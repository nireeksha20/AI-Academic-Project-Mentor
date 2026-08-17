import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, Activity } from "lucide-react";

import { projectService } from "../services/projectService";

export default function FacultyDashboard({ project, blueprint, progress }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const completion = progress?.overallCompletion || 0;

  const health =
    completion >= 80 ? "Healthy" : completion >= 50 ? "Attention" : "Critical";

  useEffect(() => {
    if (!project?._id) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);

        const response = await projectService.getFacultySummary(project._id);

        setSummary(
          response?.data?.summary ||
            response?.summary ||
            "No summary available.",
        );
      } catch (error) {
        console.error("Faculty summary failed:", error);

        setSummary("Unable to generate faculty summary at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [project?._id]);

  return (
    <div className="space-y-6">
      {/* Metrics */}

      <div className="grid gap-4 md:grid-cols-4">
        <Metric
          title="Project Health"
          value={health}
          icon={<Activity />}
          color="text-green-400"
        />

        <Metric
          title="Completion"
          value={`${completion}%`}
          icon={<CheckCircle2 />}
          color="text-cyan-400"
        />

        <Metric
          title="Current Stage"
          value={progress?.currentStage || "Planning"}
          icon={<Clock />}
        />

        <Metric
          title="Risk Level"
          value={blueprint?.risk?.overall_risk || "Low"}
          icon={<AlertTriangle />}
          color="text-yellow-400"
        />
      </div>

      {/* AI Summary */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold">AI Mentor Summary</h2>

        <pre className="mt-4 whitespace-pre-wrap font-sans leading-7 text-slate-300">
          {loading ? "Generating summary..." : summary}
        </pre>
      </div>

      {/* Faculty Observations */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold">Faculty Observations</h2>

        <ul className="mt-4 space-y-3 text-slate-300">
          <li>• Blueprint has been successfully generated.</li>

          <li>
            • Student is currently in the {progress?.currentStage || "Planning"}{" "}
            phase.
          </li>

          <li>• Overall completion is {completion}%.</li>

          <li>
            • Next milestone focuses on{" "}
            {progress?.currentGoal || "implementation"}.
          </li>
        </ul>
      </div>
    </div>
  );
}

function Metric({ title, value, icon, color = "text-white" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
      <div className="mb-3 text-cyan-400">{icon}</div>

      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>

      <h3 className={`mt-2 text-xl font-bold ${color}`}>{value}</h3>
    </div>
  );
}
