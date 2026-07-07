import { motion } from "framer-motion";
import FeatureCard from "../FeatureCard";
import {
  FaBrain,
  FaProjectDiagram,
  FaLaptopCode,
  FaDatabase,
  FaRoute,
  FaGraduationCap,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-cyan-400" />,
    title: "Idea Analysis",
    description: "AI understands your project requirements and objectives.",
  },
  {
    icon: <FaProjectDiagram className="text-blue-400" />,
    title: "Blueprint Generation",
    description: "Automatically creates a structured software blueprint.",
  },
  {
    icon: <FaLaptopCode className="text-purple-400" />,
    title: "Technology Recommendation",
    description: "Suggests the best frameworks and tools.",
  },
  {
    icon: <FaDatabase className="text-green-400" />,
    title: "Database Design",
    description: "Generates ER diagrams and database schema.",
  },
  {
    icon: <FaRoute className="text-orange-400" />,
    title: "Roadmap Planning",
    description: "Creates milestone-wise development roadmap.",
  },
  {
    icon: <FaGraduationCap className="text-pink-400" />,
    title: "Academic Mentor",
    description: "Provides continuous AI guidance throughout development.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-5xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-slate-300">
          Everything required to transform a simple project idea into a complete
          software development blueprint.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
