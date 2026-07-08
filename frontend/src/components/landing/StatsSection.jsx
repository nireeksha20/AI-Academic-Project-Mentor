import { motion } from "framer-motion";
import { Bot, GitBranch, Layers3, Mic } from "lucide-react";

const capabilities = [
  {
    title: "7+ AI Agents",
    description: "Specialized collaborative AI agents working together.",
    icon: Bot,
    accent: "from-cyan-400/20 to-sky-500/10",
  },
  {
    title: "6 Blueprint Outputs",
    description:
      "Architecture, APIs, Database, Roadmap, Resources and AI Mentor.",
    icon: Layers3,
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    title: "Voice + Text",
    description:
      "Supports both voice and text interaction for project submission.",
    icon: Mic,
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "End-to-End Workflow",
    description: "Idea → Analysis → Blueprint → Development",
    icon: GitBranch,
    accent: "from-emerald-400/20 to-cyan-400/10",
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            WHY STUDENTS CHOOSE US
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Choose AI Academic Project Mentor
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Everything you need to transform a project idea into a complete
            AI-powered software blueprint.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                  boxShadow: "0 0 42px rgba(34,211,238,0.18)",
                }}
                className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-slate-900/70 p-7 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_38px_rgba(34,211,238,0.16)]"
              >
                <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_45%)]" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col justify-between gap-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/70 text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-white sm:text-[1.4rem]">
                      {capability.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
