import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Mic } from "lucide-react";

export default function HeroSection() {
  const [idea, setIdea] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (idea.trim() === "") return;
    setGenerated(true);
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-8 lg:flex-row">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-300">
            <Sparkles size={18} />
            Infosys Springboard Virtual Internship 7.0
          </div>

          <h1 className="mt-8 text-6xl font-black leading-[1.05] text-white lg:text-7xl">
            Transform Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Project Idea
            </span>
            <br />
            Into a
            <br />
            Complete Development Plan
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-9 text-slate-300">
            Describe your project idea in natural language. Our Hybrid
            Multi-Agent AI analyzes your requirements, recommends technologies,
            designs the database, creates a complete software blueprint,
            roadmap, and learning plan.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleGenerate}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105"
            >
              Generate Blueprint
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
              View Demo
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl">
            {/* Header */}

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  AI Academic Project Mentor
                </h3>

                <p className="text-sm text-slate-400">Hybrid Multi-Agent AI</p>
              </div>

              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Input */}

            <div className="rounded-2xl border border-white/10 bg-[#10182d] p-5">
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Describe Your Project
              </label>

              <textarea
                rows={6}
                placeholder={`Example:

Build a Smart Attendance System using Face Recognition.

The AI will recommend:
• Technology Stack
• Architecture
• Database Design
• Development Roadmap`}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-transparent p-4 text-slate-300 placeholder:text-slate-500 outline-none transition focus:border-cyan-500"
              />

              <div className="mt-5 flex gap-3">
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20">
                  <Mic size={20} className="text-slate-300" />
                </button>

                <button
                  onClick={handleGenerate}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
                >
                  ✨ Generate Project Plan
                </button>
              </div>
            </div>

            {/* OUTPUT */}

            <AnimatePresence>
              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 rounded-2xl border border-cyan-500/20 bg-[#10182d] p-5"
                >
                  <h4 className="mb-5 font-semibold text-white">
                    🤖 AI Generated Project Plan
                  </h4>

                  <div className="space-y-4">
                    {[
                      "Project Blueprint Generated",
                      "Recommended Technology Stack",
                      "Database Schema Designed",
                      "Development Roadmap Created",
                      "Learning Plan Generated",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.15,
                        }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 size={20} className="text-green-400" />

                        <span className="text-slate-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <button className="mt-6 flex items-center gap-2 font-semibold text-cyan-400 transition hover:translate-x-1">
                    Open Dashboard
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
