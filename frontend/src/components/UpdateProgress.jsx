import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";

export default function UpdateProgress() {
  const { projectId } = useParams();

  const [progress, setProgress] = useState(null);

  const [overallCompletion, setOverallCompletion] = useState(0);

  const [currentStage, setCurrentStage] = useState("Planning");

  const [currentGoal, setCurrentGoal] = useState("");

  const [notes, setNotes] = useState("");

  const [blockers, setBlockers] = useState("");

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [updateNote, setUpdateNote] = useState("");

  useEffect(() => {
    if (projectId) {
      fetchProgress();
    }
  }, [projectId]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
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

      if (!data.success) return;

      const p = data.data;

      if (!p) return;

      setProgress(p);
      setOverallCompletion(p.overallCompletion || 0);
      setCurrentStage(p.currentStage || "Planning");
      setCurrentGoal(p.currentGoal || "");
      setTasks(p.tasks || []);
      setBlockers((p.blockers || []).join(", "));
      setNotes(p.notes || "");
      setUpdateNote(p.updateNote || "");
    } catch (err) {
      console.log(err);
    }
  }

  async function saveProgress() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/v1/progress/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            overallCompletion,
            currentStage,
            currentGoal,
            notes,
            updateNote,
            blockers: blockers
              .split(",")
              .map((b) => b.trim())
              .filter(Boolean),
            tasks,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      await fetchProgress();

      alert("Progress saved successfully");
    } catch (err) {
      console.error(err);
    }
  }

  function addTask() {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        title: newTask,
        status: "pending",
      },
    ]);

    setNewTask("");
  }

  function updateTaskStatus(index, status) {
    const updated = [...tasks];

    updated[index].status = status;

    setTasks(updated);
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="mb-8">
        <Link
          to={`/project-dashboard/${projectId}`}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft size={18} />
          Back to Project Dashboard
        </Link>
      </div>

      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold">Project Progress</h2>

        <p className="text-gray-400 mt-1">
          Track your project instead of writing weekly reports.
        </p>

        <div className="mt-6">
          <label className="font-medium">Overall Completion</label>

          <input
            type="range"
            min="0"
            max="100"
            value={overallCompletion}
            onChange={(e) => setOverallCompletion(Number(e.target.value))}
            className="w-full mt-2"
          />

          <div className="mt-2 font-bold text-cyan-400">
            {overallCompletion}%
          </div>
        </div>
      </div>

      {/* Current Stage */}

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="font-bold mb-4">Current Stage</h3>

        <select
          value={currentStage}
          onChange={(e) => setCurrentStage(e.target.value)}
          className="w-full rounded-xl bg-slate-950 p-3"
        >
          <option>Planning</option>
          <option>Development</option>
          <option>Testing</option>
          <option>Documentation</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Current Goal */}

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="font-bold mb-4">Current Goal</h3>

        <textarea
          rows={3}
          value={currentGoal}
          onChange={(e) => setCurrentGoal(e.target.value)}
          placeholder="Example: Finish Mentor Chat backend"
          className="w-full rounded-xl bg-slate-950 p-3"
        />
      </div>

      {/* Today's Tasks */}

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="font-bold mb-5">Tasks</h3>

        <div className="flex gap-3">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 rounded-xl bg-slate-950 p-3"
          />

          <button
            onClick={addTask}
            className="bg-cyan-500 px-5 rounded-xl text-black font-semibold"
          >
            Add
          </button>
        </div>

        <div className="space-y-3 mt-5">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-white/10 p-4"
            >
              <span>{task.title}</span>

              <div className="flex gap-2">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(index, e.target.value)}
                  className="rounded-lg bg-slate-950 px-3 py-2"
                >
                  <option value="pending">Pending</option>

                  <option value="in_progress">In Progress</option>

                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => removeTask(index)}
                  className="text-red-400"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blockers */}

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="font-bold mb-4">Current Blockers</h3>

        <textarea
          rows={3}
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          placeholder="Separate multiple blockers with commas"
          className="w-full rounded-xl bg-slate-950 p-3"
        />
      </div>

      {/* Notes */}

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="font-bold mb-4">Notes</h3>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything worth remembering..."
          className="w-full rounded-xl bg-slate-950 p-3"
        />
      </div>

      <textarea
        value={updateNote}
        onChange={(e) => setUpdateNote(e.target.value)}
        placeholder="Describe what you completed in this update..."
        rows={4}
        className="w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-white outline-none focus:border-cyan-400"
      />

      <button
        onClick={saveProgress}
        className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black"
      >
        Save Progress
      </button>
    </div>
  );
}
