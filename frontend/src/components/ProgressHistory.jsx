import { useEffect, useState } from "react";
import { Clock3, CheckCircle2, Circle } from "lucide-react";
import { projectService } from "../services/projectService";

export default function ProgressHistory({ projectId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);

        const response = await projectService.getProgressHistory(projectId);

        if (response.success) {
          setHistory(response.data.history || []);
        }
      } catch (error) {
        console.error("Failed to load progress history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadHistory();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-400">
        No previous progress updates yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item, index) => (
        <div
          key={item._id || index}
          className="relative rounded-xl border border-white/10 bg-slate-950/50 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {index === 0 ? (
                <CheckCircle2 size={20} className="text-cyan-400" />
              ) : (
                <Circle size={20} className="text-slate-500" />
              )}

              <div>
                <p className="font-semibold text-white">
                  {item.currentStage || "Progress Update"}
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />

                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Date unavailable"}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
              {item.overallCompletion ?? 0}%
            </span>
          </div>

          {item.currentGoal && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Goal
              </p>

              <p className="mt-1 text-slate-300">{item.currentGoal}</p>
            </div>
          )}

          {item.blockers?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Blockers
              </p>

              <p className="mt-1 text-slate-300">{item.blockers.join(", ")}</p>
            </div>
          )}

          {item.updateNote && (
            <div className="mt-4 rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Update
              </p>

              <p className="mt-1 leading-6 text-slate-300">{item.updateNote}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
