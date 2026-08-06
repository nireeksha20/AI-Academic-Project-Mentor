import { useEffect, useState } from "react";

export default function Progress({ projectId }) {
  const [form, setForm] = useState({
    week: 1,
    completion: 0,
    completedTasks: "",
    pendingTasks: "",
    blockers: "",
    notes: "",
  });

  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  const loadHistory = async () => {
    const res = await fetch(
      `http://localhost:5000/api/v1/progress/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (data.success) setHistory(data.data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const saveProgress = async () => {
    await fetch(`http://localhost:5000/api/v1/progress/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        week: Number(form.week),
        completion: Number(form.completion),
        completedTasks: form.completedTasks
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        pendingTasks: form.pendingTasks
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        blockers: form.blockers,
        notes: form.notes,
      }),
    });

    loadHistory();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-slate-900 p-6 space-y-4">
        <input
          type="number"
          placeholder="Week"
          value={form.week}
          onChange={(e) => setForm({ ...form, week: e.target.value })}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="number"
          placeholder="Completion %"
          value={form.completion}
          onChange={(e) => setForm({ ...form, completion: e.target.value })}
          className="w-full p-3 rounded bg-slate-800"
        />

        <textarea
          placeholder="Completed Tasks (comma separated)"
          value={form.completedTasks}
          onChange={(e) =>
            setForm({
              ...form,
              completedTasks: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <textarea
          placeholder="Pending Tasks"
          value={form.pendingTasks}
          onChange={(e) =>
            setForm({
              ...form,
              pendingTasks: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <textarea
          placeholder="Blockers"
          value={form.blockers}
          onChange={(e) =>
            setForm({
              ...form,
              blockers: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          onClick={saveProgress}
          className="bg-cyan-500 px-5 py-2 rounded"
        >
          Save Progress
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item._id} className="rounded-xl bg-slate-900 p-5">
            <h3 className="font-bold">Week {item.week}</h3>

            <p>Completion: {item.completion}%</p>

            <p>Completed: {item.completedTasks.join(", ")}</p>

            <p>Pending: {item.pendingTasks.join(", ")}</p>

            <p>Blockers: {item.blockers}</p>

            <p>Notes: {item.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
