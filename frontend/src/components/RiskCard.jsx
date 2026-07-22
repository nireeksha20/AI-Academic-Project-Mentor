import { ShieldAlert, AlertTriangle, ShieldCheck } from "lucide-react";

export default function RiskCard({ data }) {
  if (!data) return null;

  const badgeColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-700 text-white";
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl">
      <h2 className="mb-8 flex items-center gap-3 border-b border-red-500/20 pb-5 text-3xl font-bold">
        <ShieldAlert className="text-red-400" />
        Risk Assessment
      </h2>

      {/* Overall Risk */}

      <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
        <p className="text-sm uppercase tracking-widest text-red-300">
          Overall Risk
        </p>

        <h3 className="mt-2 text-2xl font-bold">{data.overall_risk}</h3>
      </div>

      <div className="space-y-6">
        {data.risks?.map((risk, index) => (
          <div
            key={index}
            className="rounded-2xl border border-red-500/10 bg-slate-800 p-6 transition hover:border-red-400/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="text-red-400" />

                {risk.risk}
              </h3>

              <span
                className={`rounded-full border px-3 py-1 text-sm font-semibold ${badgeColor(
                  risk.severity,
                )}`}
              >
                {risk.severity}
              </span>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-900 p-4">
              <ShieldCheck className="mt-1 text-green-400" />

              <div>
                <p className="font-semibold text-green-300">Mitigation</p>

                <p className="mt-1 text-slate-300">{risk.mitigation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
