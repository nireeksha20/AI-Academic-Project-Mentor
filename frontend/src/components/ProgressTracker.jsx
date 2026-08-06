import { useEffect, useState } from "react";

export default function ProgressTracker({ projectId }) {
  const [progress, setProgress] = useState([]);
  const [week, setWeek] = useState("");
  const [completion, setCompletion] = useState(0);
  const [completedTasks, setCompletedTasks] = useState("");
  const [pendingTasks, setPendingTasks] = useState("");
  const [blockers, setBlockers] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchProgress();
  }, []);

  async function fetchProgress() {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  async function saveProgress() {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/v1/progress/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          week,
          completion,
          completedTasks,
          pendingTasks,
          blockers,
          notes,
        }),
      });

      setWeek("");
      setCompletion(0);
      setCompletedTasks("");
      setPendingTasks("");
      setBlockers("");
      setNotes("");

      fetchProgress();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="space-y-6">
      <input
        value={week}
        onChange={(e) => setWeek(e.target.value)}
        placeholder="Week (Example: Week 1)"
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3"
      />

      <input
        type="number"
        value={completion}
        onChange={(e) => setCompletion(e.target.value)}
        placeholder="Completion %"
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3"
      />

      <textarea
        rows={3}
        value={completedTasks}
        onChange={(e) => setCompletedTasks(e.target.value)}
        placeholder="Completed Tasks"
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3"
      />

      <textarea
        rows={3}
        value={pendingTasks}
        onChange={(e) => setPendingTasks(e.target.value)}
        placeholder="Pending Tasks"
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3"
      />

      <textarea
        rows={2}
        value={blockers}
        onChange={(e) => setBlockers(e.target.value)}
        placeholder="Blockers"
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3"
      />

      <textarea
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        className="w-full rounded-xl bg-slate-950 border border-white/10 p-3"
      />

      <button
        onClick={saveProgress}
        className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"
      >
        Save Progress
      </button>

      <div className="space-y-4">
        {progress.map((item) => (
          <div
            key={item._id}
            className="rounded-xl border border-white/10 bg-slate-950 p-5"
          >
            <h3 className="font-bold text-cyan-400">{item.week}</h3>

            <p>Completion: {item.completion}%</p>

            <p className="mt-3">
              <strong>Completed</strong>
            </p>

            <p>{item.completedTasks}</p>

            <p className="mt-3">
              <strong>Pending</strong>
            </p>

            <p>{item.pendingTasks}</p>

            <p className="mt-3">
              <strong>Blockers</strong>
            </p>

            <p>{item.blockers}</p>

            <p className="mt-3">
              <strong>Notes</strong>
            </p>

            <p>{item.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
