import { motion } from "framer-motion";

const steps = [
  "Complete Profile",
  "Describe Your Project Idea",
  "AI Generates Blueprint",
  "Build & Learn with AI Mentor",
];

export default function HowItWorksSection() {
  return (
    <section id="workflow" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-5xl font-bold text-white">
        How It Works
      </h2>

      <div className="mt-16 grid gap-8 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
              {index + 1}
            </div>

            <h3 className="font-semibold text-white">{step}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
