import { motion } from "framer-motion";
import Button from "./Button";
import GlassCard from "./GlassCard";
import { FaRobot, FaProjectDiagram, FaGraduationCap } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pt-36 lg:flex-row">
      {/* Left */}

      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
          🚀 Infosys Springboard Virtual Internship 7.0
        </div>

        <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
          Transform Your
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {" "}
            Project Idea{" "}
          </span>
          Into a Complete
          <br />
          AI Blueprint
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
          Describe your project idea in just a few lines. Our multi-agent AI
          analyzes feasibility, recommends technologies, creates milestones, and
          mentors you throughout your development journey.
        </p>

        <div className="mt-10 flex gap-4">
          <Button>Get Started</Button>

          <Button variant="outline">Login</Button>
        </div>
      </motion.div>

      {/* Right */}

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-1 justify-center"
      >
        <GlassCard className="w-full max-w-lg p-10">
          <div className="space-y-6">
            <GlassCard className="flex items-center gap-4 p-4">
              <FaRobot className="text-3xl text-cyan-400" />

              <div>
                <h3 className="font-bold text-white">AI Blueprint</h3>

                <p className="text-slate-300">Generated Successfully</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 p-4">
              <FaProjectDiagram className="text-3xl text-purple-400" />

              <div>
                <h3 className="font-bold text-white">Timeline</h3>

                <p className="text-slate-300">Smart Roadmap Created</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-4 p-4">
              <FaGraduationCap className="text-3xl text-green-400" />

              <div>
                <h3 className="font-bold text-white">Academic Mentor</h3>

                <p className="text-slate-300">Ready to Guide You</p>
              </div>
            </GlassCard>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
