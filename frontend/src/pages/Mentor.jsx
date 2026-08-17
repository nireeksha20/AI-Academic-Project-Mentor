import { Link } from "react-router-dom";
import {
  BrainCircuit,
  FileSearch,
  Cpu,
  GitBranch,
  Bug,
  FlaskConical,
  Presentation,
  ArrowRight,
} from "lucide-react";

const agents = [
  {
    id: "requirements",
    title: "Requirement Analyzer",
    desc: "Convert ideas into functional & non-functional requirements.",
    icon: FileSearch,
    color: "from-cyan-500 to-sky-500",
  },
  {
    id: "techstack",
    title: "Tech Stack Advisor",
    desc: "Choose the best technologies for your project.",
    icon: Cpu,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "architecture",
    title: "Architecture Designer",
    desc: "Generate ER diagrams, modules and system architecture.",
    icon: GitBranch,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "debug",
    title: "Code Debug Mentor",
    desc: "Explain errors and help debug your code intelligently.",
    icon: Bug,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "testing",
    title: "Testing Assistant",
    desc: "Generate test cases, edge cases and validation reports.",
    icon: FlaskConical,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "presentation",
    title: "Presentation Coach",
    desc: "Prepare viva questions and presentation guidance.",
    icon: Presentation,
    color: "from-indigo-500 to-blue-500",
  },
];

export default function Mentor() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/dashboard" className="text-cyan-400 hover:underline">
          ← Back to Dashboard
        </Link>

        <div className="mt-6 mb-10">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-cyan-400" size={36} />
            <h1 className="text-4xl font-bold">AI Mentor Workspace</h1>
          </div>

          <p className="text-slate-400 mt-3 max-w-3xl">
            Your intelligent project companion. Choose an assistant to solve
            specific project challenges throughout development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;

            return (
              <Link
                key={agent.id}
                to={`/mentor/chat?agent=${agent.id}`}
                className="group rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-left hover:border-cyan-400/40 hover:-translate-y-1 transition-all block"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-5`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold">{agent.title}</h3>

                <p className="text-slate-400 text-sm mt-3 leading-6">
                  {agent.desc}
                </p>

                <div className="mt-6 flex items-center text-cyan-400 font-medium">
                  Open Assistant
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
