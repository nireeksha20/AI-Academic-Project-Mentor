import { motion } from "framer-motion";
import { Rocket, Sparkles, GraduationCap } from "lucide-react";

const highlights = [
  {
    icon: Rocket,
    title: "Built for Students",
    description:
      "Designed specifically to help students transform project ideas into structured software solutions.",
  },
  {
    icon: Sparkles,
    title: "Launching Soon",
    description:
      "Our multi-agent AI mentor is under active development and will soon be available for students.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description:
      "Focused on project guidance, learning support, architecture planning, and real-world implementation.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            COMING SOON
          </p>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for the Next Generation of Student Projects
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            AI Academic Project Mentor is currently under development. Soon,
            students will be able to transform simple ideas into complete
            software blueprints with the help of specialized AI agents.
          </p>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mx-auto mt-14 max-w-4xl rounded-[32px] border border-cyan-400/20 bg-slate-900/70 p-10 shadow-[0_25px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,.25)]">
            <Rocket className="h-10 w-10" />
          </div>

          <h3 className="mt-8 text-3xl font-semibold">🚀 Launching Soon</h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            We're building an intelligent platform that helps students
            brainstorm ideas, design software architecture, select technologies,
            create project roadmaps, and learn throughout the entire development
            journey.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.4,
                  }}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,.12)]"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h4 className="mt-5 text-lg font-semibold">{item.title}</h4>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
