import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import {
  FaRobot,
  FaMicrophone,
  FaProjectDiagram,
  FaRoute,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaRobot className="text-4xl text-cyan-400" />,
    title: "7 AI Agents",
    description:
      "Specialized agents collaborate to build your project blueprint.",
  },
  {
    icon: <FaProjectDiagram className="text-4xl text-blue-400" />,
    title: "AI Blueprint",
    description: "Complete software architecture generated automatically.",
  },
  {
    icon: <FaMicrophone className="text-4xl text-purple-400" />,
    title: "Voice + Text",
    description: "Describe your idea naturally using voice or text.",
  },
  {
    icon: <FaRoute className="text-4xl text-green-400" />,
    title: "Smart Roadmap",
    description: "Milestone-wise implementation plan for your project.",
  },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((item, index) => (
          <GlassCard
            key={index}
            className="p-6 text-center hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-5">{item.icon}</div>

            <h3 className="text-xl font-bold text-white">{item.title}</h3>

            <p className="mt-3 text-slate-300 text-sm">{item.description}</p>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
