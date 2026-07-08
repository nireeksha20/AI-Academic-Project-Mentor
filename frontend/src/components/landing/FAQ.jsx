import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is AI Academic Project Mentor?",
    answer:
      "AI Academic Project Mentor is an intelligent platform that transforms project ideas into structured software blueprints using specialized AI agents. It assists students throughout planning, design, learning, and implementation.",
  },
  {
    question: "Who can use this platform?",
    answer:
      "The platform is designed for engineering students, beginners, educators, and developers who need guidance while building academic or personal software projects.",
  },
  {
    question: "How does the AI mentor work?",
    answer:
      "Multiple AI agents collaborate to analyze requirements, recommend technologies, design software architecture, create database models, prepare implementation roadmaps, and suggest learning resources.",
  },
  {
    question: "Do I need programming experience?",
    answer:
      "No. The AI mentor provides beginner-friendly explanations, recommends learning materials, and guides you step-by-step throughout the development process.",
  },
  {
    question: "Can I customize the generated roadmap?",
    answer:
      "Yes. Every recommendation, milestone, technology choice, and project plan can be customized according to your goals and preferences.",
  },
  {
    question: "Is AI Academic Project Mentor free?",
    answer:
      "During the initial release, core planning and mentoring features will be available for students. Additional capabilities may be introduced in future versions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden py-24 text-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            FAQ
          </p>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Everything you need to know about AI Academic Project Mentor and how
            it helps students build successful software projects.
          </p>
        </motion.div>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,.35)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-7 py-6 text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <ChevronDown className="h-6 w-6 text-cyan-300" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.28,
                      }}
                    >
                      <div className="border-t border-white/10 px-7 pb-7 pt-5">
                        <p className="leading-8 text-slate-400">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
