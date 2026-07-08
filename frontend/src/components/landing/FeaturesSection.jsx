import { motion } from "framer-motion";
import {
  Blocks,
  BrainCircuit,
  Cpu,
  Database,
  GraduationCap,
  Route,
} from "lucide-react";

const features = [
  {
    title: "AI Requirement Analysis",
    description:
      "Understands project objectives, scope, constraints and functional requirements.",
    icon: BrainCircuit,
    accent: "from-cyan-400/20 to-sky-500/10",
  },
  {
    title: "Software Architecture",
    description:
      "Generates scalable architecture, modules, APIs and system flow automatically.",
    icon: Blocks,
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    title: "Database Design",
    description:
      "Creates ER diagrams, entities, relationships and optimized database schema.",
    icon: Database,
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Technology Recommendation",
    description:
      "Suggests the best frontend, backend, database and AI stack for your project.",
    icon: Cpu,
    accent: "from-emerald-400/20 to-cyan-400/10",
  },
  {
    title: "Development Roadmap",
    description:
      "Creates milestone-wise implementation roadmap from planning to deployment.",
    icon: Route,
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    title: "AI Academic Mentor",
    description:
      "Provides continuous guidance, explanations, debugging help and learning resources throughout development.",
    icon: GraduationCap,
    accent: "from-cyan-400/20 to-violet-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-4xl text-center hover:-translate-y-2
hover:shadow-[0_0_40px_rgba(34,211,238,.18)]
transition-all
duration-300"
        >
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            CORE FEATURES
          </p>
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything You Need To Build Your Project
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] text-base leading-[1.8] text-slate-400 sm:text-lg">
            From idea analysis to architecture, database design, roadmap
            generation and AI mentoring — everything is generated in one
            intelligent workflow.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                  boxShadow: "0 0 42px rgba(34,211,238,0.18)",
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/15 bg-slate-900/70 px-8 py-8 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_38px_rgba(34,211,238,0.16)]"
              >
                <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_46%)]" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col gap-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/70 text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold leading-[1.3] tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-slate-400">
                      {feature.description}
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
