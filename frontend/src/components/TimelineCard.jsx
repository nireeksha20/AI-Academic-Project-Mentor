import { Code2, CalendarDays, CheckCircle2 } from "lucide-react";

export default function TimelineCard({ data }) {
  if (!data) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl">
      <h2 className="mb-8 flex items-center gap-3 border-b border-blue-500/20 pb-5 text-3xl font-bold">
        <Code2 className="text-cyan-400" />
        Development Timeline
      </h2>

      {/* Duration */}

      <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-sm uppercase tracking-widest text-cyan-400">
          Estimated Duration
        </p>

        <h3 className="mt-2 text-2xl font-bold">{data.estimated_duration}</h3>
      </div>

      {/* Weeks */}

      <div className="space-y-6">
        {data.phases?.map((phase, index) => (
          <div
            key={index}
            className="rounded-2xl border border-blue-500/10 bg-slate-800 p-6 transition hover:border-blue-400/40"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                <CalendarDays className="text-cyan-400" />
              </div>

              <h3 className="text-xl font-semibold">{phase.title}</h3>
            </div>

            <div className="space-y-3">
              {phase.tasks?.map((task, taskIndex) => (
                <div key={taskIndex} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 text-green-400" />

                  <p>{task}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
