import { CheckCircle2, AlertTriangle, BookOpen, Lightbulb } from "lucide-react";

export default function FeasibilityCard({ data }) {
  if (!data) return null;

  const score = data.feasibility_score || 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl">
      <h2 className="mb-8 flex items-center gap-3 border-b border-cyan-500/20 pb-5 text-3xl font-bold">
        <CheckCircle2 className="text-cyan-400" />
        Feasibility Report
      </h2>

      {/* Verdict */}

      <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-sm uppercase tracking-widest text-cyan-400">
          Verdict
        </p>

        <p className="mt-2 text-lg font-medium leading-8">{data.verdict}</p>
      </div>

      {/* Metrics */}

      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard title="Feasibility Score" value={`${score}/10`} />

        <MetricCard title="Complexity" value={data.complexity} />

        <MetricCard
          title="Industry Value"
          value={`${data.industry_value}/10`}
        />

        <MetricCard
          title="Portfolio Value"
          value={`${data.portfolio_value}/10`}
        />
      </div>

      {/* Progress */}

      <div className="mt-8">
        <div className="mb-2 flex justify-between">
          <span className="text-slate-400">Overall Feasibility</span>

          <span className="font-semibold text-cyan-300">{score}/10</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
            style={{
              width: `${score * 10}%`,
            }}
          />
        </div>
      </div>

      {/* Strengths */}

      <Section
        title="Strengths"
        icon={<CheckCircle2 className="text-green-400" />}
        items={data.strengths}
      />

      {/* Challenges */}

      <Section
        title="Challenges"
        icon={<AlertTriangle className="text-yellow-400" />}
        items={data.challenges}
      />

      {/* Skills */}

      <Section
        title="Skills to Learn"
        icon={<BookOpen className="text-cyan-400" />}
        items={data.skills_to_learn}
      />

      {/* Suggestions */}

      <Section
        title="Suggestions"
        icon={<Lightbulb className="text-violet-400" />}
        items={data.suggestions}
      />
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-cyan-500/10 bg-slate-800 p-6 transition hover:border-cyan-400/40 hover:bg-slate-800/80">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-2 text-xl font-bold text-cyan-300">{value}</h3>
    </div>
  );
}

function Section({ title, items, icon }) {
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
            className="rounded-xl border border-white/5 bg-slate-800 p-4 transition hover:border-cyan-400/30 hover:bg-slate-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
