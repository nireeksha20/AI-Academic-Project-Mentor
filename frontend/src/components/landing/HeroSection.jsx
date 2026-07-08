import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  DatabaseZap,
  Layers3,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const pills = ["AI Analysis", "Architecture", "Database", "Learning Resources"];

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.2),_transparent_35%)]"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:px-8 lg:py-28">
        <div className="absolute left-1/2 top-24 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.16)]">
              <Sparkles className="h-4 w-4" />
              Hybrid Multi-Agent AI Platform
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Transform Your Project Idea Into Reality
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              Turn a simple concept into a complete blueprint with architecture,
              APIs, database design, roadmap, and guided mentorship powered by
              collaborative AI agents.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <RouterLink
                to="/register"
                className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Start Building →
              </RouterLink>

              <a
                href="#how-it-works"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 active:scale-95"
              >
                Watch Demo
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 shadow-[0_0_20px_rgba(15,23,42,0.35)]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.7)] backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                  Live AI Workflow
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                    <BrainCircuit className="h-4 w-4 text-cyan-300" />
                    Student Idea
                  </div>
                  <p className="text-sm leading-7 text-slate-400">
                    “Build a study planner that recommends habits and tracks
                    progress for university students.”
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.35 }}
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-100">
                    <Sparkles className="h-4 w-4" />
                    AI Processing
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-400/30 bg-slate-950/60 px-3 py-1 text-xs font-medium text-cyan-100">
                      Requirement Analysis
                    </span>
                    <span className="rounded-full border border-cyan-400/30 bg-slate-950/60 px-3 py-1 text-xs font-medium text-cyan-100">
                      System Design
                    </span>
                    <span className="rounded-full border border-cyan-400/30 bg-slate-950/60 px-3 py-1 text-xs font-medium text-cyan-100">
                      Roadmap Generation
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.35 }}
                  className="grid gap-3 md:grid-cols-2"
                >
                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                      <Layers3 className="h-4 w-4 text-violet-300" />
                      Generated Blueprint
                    </div>
                    <div className="space-y-2 text-sm text-slate-400 delay:0.2">
                      <p>• Architecture plan</p>
                      <p>• API contract</p>
                      <p>• Database schema</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                      <DatabaseZap className="h-4 w-4 text-sky-300" />
                      Dashboard Preview
                    </div>
                    <div className="space-y-2 text-sm text-slate-400 delay:0.2">
                      <p>• Roadmap timeline</p>
                      <p>• Learning resources</p>
                      <p>• AI mentor prompts</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
