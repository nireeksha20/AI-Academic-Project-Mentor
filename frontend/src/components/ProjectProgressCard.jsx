import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectProgressCard({ projectId }) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchLatestProgress();
  }, []);

  async function fetchLatestProgress() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/v1/progress/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (data.success) {
      setProgress(data.data);
    }
  }

  if (!progress) {
    return (
      <div className="rounded-2xl bg-slate-900 p-6 space-y-5">
        <p className="text-slate-400">No progress has been recorded yet.</p>

        <div className="flex justify-end">
          <Link
            to={`/project-dashboard/${projectId}/update-progress`}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
          >
            Update Progress →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Progress</h2>

        <p className="text-gray-400">
          Last updated {new Date(progress.updatedAt).toLocaleString()}
        </p>
      </div>

      <div>
        <div className="flex justify-between">
          <span>Overall Completion</span>
          <span>{progress.overallCompletion}%</span>
        </div>

        <div className="h-3 rounded-full bg-slate-700 mt-2 overflow-hidden">
          <div
            className="h-full bg-cyan-500"
            style={{
              width: `${progress.overallCompletion}%`,
            }}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Current Stage</h3>
        <p>{progress.currentStage}</p>
      </div>

      <div>
        <h3 className="font-semibold">Current Goal</h3>
        <p>{progress.currentGoal}</p>
      </div>

      <div>
        <h3 className="font-semibold">Current Blockers</h3>
        <p>
          {progress.blockers?.length ? progress.blockers.join(", ") : "None"}
        </p>
      </div>

      <div className="flex justify-end">
        <Link
          to={`/project-dashboard/${projectId}/update-progress`}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          Update Progress →
        </Link>
      </div>
    </div>
  );
}
