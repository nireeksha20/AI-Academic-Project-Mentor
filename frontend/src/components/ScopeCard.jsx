import {
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  Rocket,
  Ban,
  Package,
} from "lucide-react";

export default function ScopeCard({ data }) {
  if (!data) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl">
      <h2 className="mb-8 flex items-center gap-3 border-b border-emerald-500/20 pb-5 text-3xl font-bold">
        <BrainCircuit className="text-emerald-400" />
        Project Scope
      </h2>

      {/* Goal */}

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-sm uppercase tracking-widest text-cyan-400">
          Project Goal
        </p>

        <p className="mt-3 leading-8 text-lg">{data.goal}</p>
      </div>

      <ListSection
        title="Core Features"
        icon={<CheckCircle2 className="text-green-400" />}
        items={data.core_features}
      />

      <ListSection
        title="Optional Features"
        icon={<Sparkles className="text-cyan-400" />}
        items={data.optional_features}
      />

      <ListSection
        title="Future Features"
        icon={<Rocket className="text-violet-400" />}
        items={data.future_features}
      />

      <ListSection
        title="Out of Scope"
        icon={<Ban className="text-red-400" />}
        items={data.out_of_scope}
      />

      <ListSection
        title="Deliverables"
        icon={<Package className="text-orange-400" />}
        items={data.deliverables}
      />
    </div>
  );
}

function ListSection({ title, items, icon }) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        {icon}

        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="space-y-3">
        {items?.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-800 p-4 transition hover:border-cyan-400/30 hover:bg-slate-700"
          >
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
