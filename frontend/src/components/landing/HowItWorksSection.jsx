import { motion } from "framer-motion";
import {
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Database,
  GitBranch,
  Lightbulb,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    title: "Student Idea",
    description: "Describe your project concept in plain language.",
    icon: Lightbulb,
    accent: "from-cyan-400/20 to-sky-500/10",
  },
  {
    title: "AI Requirement Analysis",
    description: "The agents clarify scope, requirements and constraints.",
    icon: BrainCircuit,
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    title: "Software Architecture",
    description: "System modules, APIs and flows are generated automatically.",
    icon: Boxes,
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Database Design",
    description: "Entities, schemas and relationships are structured clearly.",
    icon: Database,
    accent: "from-emerald-400/20 to-cyan-400/10",
  },
  {
    title: "Development Roadmap",
    description: "Milestones, tasks and implementation phases are organized.",
    icon: GitBranch,
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    title: "AI Mentor Dashboard",
    description:
      "Guidance, resources and next steps are delivered continuously.",
    icon: MonitorSmartphone,
    accent: "from-cyan-400/20 to-violet-500/10",
  },
];

const previewItems = [
  "Architecture Generated",
  "Database Ready",
  "APIs Generated",
  "Roadmap Created",
  "AI Mentor Active",
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            From Idea To Complete Project Blueprint
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Simply describe your project idea and our AI agents collaborate to
            generate everything required for development.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[44%] h-px -translate-y-1/2 bg-linear-to-r from-cyan-400/20 via-cyan-400/60 to-violet-500/20" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.title}
                  className="relative flex h-full items-stretch"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 0 44px rgba(34,211,238,0.2)",
                    }}
                    className="group relative flex h-full min-h-80 w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 p-8 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-[0_0_44px_rgba(34,211,238,0.22)]"
                  >
                    <div className="absolute right-3 top-3 rounded-full border border-cyan-400/20 bg-slate-950/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur-md">
                      Step 0{index + 1}
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_45%)]" />
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${step.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                    />
                    <div className="relative flex h-full flex-col items-start gap-5 pt-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/70 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)] transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex flex-1 flex-col justify-start">
                        <h3 className="text-xl font-semibold leading-[1.2] tracking-tight text-white sm:text-[1.15rem]">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[0.95rem] font-medium leading-7 text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08 + 0.15,
                      }}
                      className="pointer-events-none hidden lg:flex absolute -right-4 top-1/2 h-px w-8 -translate-y-1/2 items-center opacity-70"
                    >
                      <div className="h-px w-full bg-linear-to-r from-cyan-400/25 via-cyan-400/55 to-violet-500/25" />
                      <div className="ml-2 h-2.5 w-2.5 rounded-full border border-cyan-400/40 bg-cyan-400/20" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-20 rounded-4xl border border-white/15 bg-slate-900/70 p-8 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-10"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div className="flex flex-col items-start justify-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-200">
                <Sparkles className="h-4 w-4" />
                AI Blueprint Ready
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                Your project becomes a polished, actionable development plan.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {previewItems.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex h-full min-h-13 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/80"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="leading-6">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
