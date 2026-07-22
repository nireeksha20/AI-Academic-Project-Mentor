import {
  Database,
  Monitor,
  Server,
  Bot,
  Rocket,
  Boxes,
  Lightbulb,
} from "lucide-react";

export default function TechnologyCard({ data }) {
  if (!data) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl">
      <h2 className="mb-8 flex items-center gap-3 border-b border-violet-500/20 pb-5 text-3xl font-bold">
        <Database className="text-cyan-400" />
        Technology Recommendation
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <TechItem
          icon={<Monitor className="text-cyan-400" />}
          title="Frontend"
          value={data.frontend}
        />

        <TechItem
          icon={<Server className="text-green-400" />}
          title="Backend"
          value={data.backend}
        />

        <TechItem
          icon={<Database className="text-yellow-400" />}
          title="Database"
          value={data.database}
        />

        <TechItem
          icon={<Bot className="text-violet-400" />}
          title="AI Stack"
          value={data.ai_stack}
        />

        <TechItem
          icon={<Rocket className="text-orange-400" />}
          title="Deployment"
          value={data.deployment}
        />
      </div>

      {/* Architecture */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Boxes className="text-cyan-400" />

          <h3 className="text-xl font-semibold">Architecture</h3>
        </div>

        <p className="leading-8">{data.architecture}</p>
      </div>

      {/* Recommendations */}

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />

          <h3 className="text-xl font-semibold">Recommendations</h3>
        </div>

        <div className="space-y-3">
          {data.recommendations?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/5 bg-slate-800 p-4 transition hover:border-cyan-400/30 hover:bg-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechItem({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-violet-500/10 bg-slate-800 p-6 transition hover:border-violet-400/40">
      <div className="mb-3 flex items-center gap-2">
        {icon}

        <h3 className="font-semibold">{title}</h3>
      </div>

      <p className="text-lg text-cyan-300">{value}</p>
    </div>
  );
}
