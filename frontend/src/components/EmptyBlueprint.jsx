import { Sparkles, CheckCircle2 } from "lucide-react";

export default function EmptyBlueprint({ onGenerate, generating }) {
  return (
    <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-slate-900/60 p-16 text-center">
      <Sparkles className="mx-auto text-cyan-400" size={64} />

      <h2 className="mt-6 text-4xl font-bold">Generate Your AI Blueprint</h2>

      <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-400">
        Our AI agents will analyze your project and generate a complete
        implementation blueprint including feasibility analysis, architecture,
        roadmap, timeline and risk assessment.
      </p>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        <Feature text="Feasibility Analysis" />
        <Feature text="Project Scope" />
        <Feature text="Technology Recommendation" />
        <Feature text="Development Timeline" />
        <Feature text="Risk Assessment" />
        <Feature text="Implementation Suggestions" />
      </div>

      <button
        onClick={onGenerate}
        disabled={generating}
        className="mt-12 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-10 py-4 text-lg font-semibold transition hover:scale-105"
      >
        {generating ? "Generating Blueprint..." : "✨ Generate AI Blueprint"}
      </button>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
      <CheckCircle2 className="text-cyan-400" />
      {text}
    </div>
  );
}
