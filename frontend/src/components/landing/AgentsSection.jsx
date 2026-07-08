import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  BrainCircuit,
  Cpu,
  Database,
  GraduationCap,
  Route,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const agents = [
  {
    id: "requirement-analyst",
    name: "Requirement Analyst",
    title: "Requirement Analyst",
    description:
      "Turns raw ideas into clear product requirements, scope boundaries, and user stories.",
    icon: BrainCircuit,
    accent: "from-cyan-400/25 to-sky-500/10",
    responsibilities: [
      "Maps user goals into structured requirements",
      "Clarifies edge cases and product constraints",
      "Prioritizes outcomes for faster execution",
    ],
    output: "Refined project brief and feature scope",
    example: "A startup idea becomes a well-scoped MVP plan.",
    position: "top",
  },
  {
    id: "software-architect",
    name: "Software Architect",
    title: "Software Architect",
    description:
      "Designs the technical foundation, modules, flows, and scalable system structure.",
    icon: Boxes,
    accent: "from-violet-500/25 to-fuchsia-500/10",
    responsibilities: [
      "Architects system modules and interfaces",
      "Defines scalable application flows",
      "Connects frontend, backend, and services",
    ],
    output: "System architecture blueprint",
    example: "A multi-service platform is mapped into clear modules.",
    position: "top-right",
  },
  {
    id: "database-designer",
    name: "Database Designer",
    title: "Database Designer",
    description:
      "Builds the data model, relationships, and schema strategy for the product.",
    icon: Database,
    accent: "from-blue-500/20 to-cyan-500/10",
    responsibilities: [
      "Designs entities and relationships",
      "Defines schema and storage strategy",
      "Optimizes data access patterns",
    ],
    output: "Database schema and entity map",
    example: "User, project, and content models are structured cleanly.",
    position: "right",
  },
  {
    id: "tech-stack-advisor",
    name: "Tech Stack Advisor",
    title: "Tech Stack Advisor",
    description:
      "Recommends the right tools, frameworks, and architecture choices for the build.",
    icon: Cpu,
    accent: "from-emerald-400/20 to-cyan-400/10",
    responsibilities: [
      "Chooses suitable languages and frameworks",
      "Matches tools to project constraints",
      "Prepares a practical build stack",
    ],
    output: "Recommended development stack",
    example: "The ideal React, Node, and database stack is proposed.",
    position: "bottom-right",
  },
  {
    id: "roadmap-planner",
    name: "Roadmap Planner",
    title: "Roadmap Planner",
    description:
      "Organizes delivery into milestones, phases, and practical next steps.",
    icon: Route,
    accent: "from-violet-500/20 to-indigo-500/10",
    responsibilities: [
      "Turns architecture into milestones",
      "Sequence work into clear phases",
      "Prioritizes execution for momentum",
    ],
    output: "Delivery roadmap and milestone plan",
    example: "A six-week implementation path becomes immediately actionable.",
    position: "bottom-left",
  },
  {
    id: "academic-mentor",
    name: "AI Academic Mentor",
    title: "AI Academic Mentor",
    description:
      "Guides learning, explains concepts, and supports deeper project understanding.",
    icon: GraduationCap,
    accent: "from-cyan-400/20 to-violet-500/10",
    responsibilities: [
      "Explains technical concepts clearly",
      "Provides project guidance and feedback",
      "Supports continuous learning and growth",
    ],
    output: "Tutor-style guidance and learning support",
    example: "Complex topics are broken down into beginner-friendly steps.",
    position: "left",
  },
  {
    id: "resource-finder",
    name: "Resource Finder",
    title: "Resource Finder",
    description:
      "Finds references, templates, and helpful materials that accelerate delivery.",
    icon: Search,
    accent: "from-fuchsia-500/20 to-cyan-500/10",
    responsibilities: [
      "Finds relevant references and patterns",
      "Surfaces templates and implementation ideas",
      "Keeps momentum with curated resources",
    ],
    output: "Curated learning and implementation resources",
    example:
      "Relevant documentation and starter assets are gathered instantly.",
    position: "top-left",
  },
];

const stats = [
  { value: "7 Specialized Agents", label: "Working Together" },
  { value: "Parallel AI Processing", label: "Faster Project Planning" },
  { value: "Complete Project Blueprint", label: "Generated End-to-End" },
];

export default function AgentsSection() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const containerSize = 560;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const orbitRadius = 215;
  const centerNodeSize = 128;
  const cardWidth = 126;
  const cardHeight = 88;

  // Every card is placed on the orbit circle using polar coordinates, at
  // perfectly equal angular increments, starting at 12 o'clock. This
  // guarantees the orbit ring passes exactly through each card's center
  // and that all seven cards are optically balanced around it.
  const angleStep = (2 * Math.PI) / agents.length;
  const startAngle = -Math.PI / 2;
  const networkNodes = [
    {
      id: agents[0].id,
      x: centerX + 5,
      y: centerY - 240,
      lineX: centerX + 100,
      lineY: centerY - 195,
    },

    {
      id: agents[1].id,
      x: centerX + 140,
      y: centerY - 115,
      lineX: centerX + 180,
      lineY: centerY - 85,
    },

    {
      id: agents[2].id,
      x: centerX + 140,
      y: centerY + 30,
      lineX: centerX + 140,
      lineY: centerY + 75,
    },

    {
      id: agents[3].id,
      x: centerX,
      y: centerY + 155,
      lineX: centerX + 70,
      lineY: centerY + 165,
    },

    {
      id: agents[4].id,
      x: centerX - 205,
      y: centerY + 115,
      lineX: centerX - 200,
      lineY: centerY + 185,
    },

    {
      id: agents[5].id,
      x: centerX - 270,
      y: centerY - 50,
      lineX: centerX - 260,
      lineY: centerY,
    },

    {
      id: agents[6].id,
      x: centerX - 200,
      y: centerY - 210,
      lineX: centerX - 160,
      lineY: centerY - 140,
    },
  ];

  const getCircleBoundaryPoint = (fromX, fromY, toX, toY, radius) => {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const length = Math.hypot(dx, dy) || 1;
    return {
      x: fromX + (dx / length) * radius,
      y: fromY + (dy / length) * radius,
    };
  };

  const getRectBoundaryPoint = (fromX, fromY, toX, toY, width, height) => {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const scaleX = width / 2 / Math.max(Math.abs(dx), 1e-6);
    const scaleY = height / 2 / Math.max(Math.abs(dy), 1e-6);
    const scale = Math.min(scaleX, scaleY);
    return {
      x: fromX + dx * scale,
      y: fromY + dy * scale,
    };
  };

  return (
    <section
      id="agents"
      className="relative overflow-hidden py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            AI AGENTS
          </p>
          <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Meet Your AI Team
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Specialized AI agents collaborate together to transform a simple
            project idea into a complete software blueprint and personalized
            development experience.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto flex w-full max-w-160 items-center justify-center"
          >
            <div className="relative mx-auto aspect-square w-full max-w-140">
              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-slate-950/85 shadow-[0_0_56px_rgba(34,211,238,0.24)] backdrop-blur-xl" />
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/35 bg-cyan-400/10 shadow-[0_0_70px_rgba(34,211,238,0.2)]"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                  CORE
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Project Idea
                </p>
              </div>

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${containerSize} ${containerSize}`}
                fill="none"
              >
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={orbitRadius}
                  stroke="rgba(34,211,238,0.18)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {networkNodes.map((node, index) => {
                  const agent = agents[index];
                  const isSelected = agent.id === selectedAgent.id;
                  const start = getCircleBoundaryPoint(
                    centerX,
                    centerY,
                    node.x,
                    node.y,
                    centerNodeSize / 2,
                  );

                  return (
                    <g key={agent.id}>
                      <motion.line
                        x1={start.x}
                        y1={start.y}
                        x2={node.lineX}
                        y2={node.lineY}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: isSelected ? 0.8 : 0.32,
                        }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        stroke="url(#lineGradient)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      {isSelected ? (
                        <motion.line
                          x1={start.x}
                          y1={start.y}
                          x2={node.lineX}
                          y2={node.lineY}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1],
                            opacity: [0.18, 0.95, 0.18],
                            strokeDashoffset: [-10, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          stroke="url(#lineGradient)"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeDasharray="6 8"
                        />
                      ) : null}
                    </g>
                  );
                })}
              </svg>

              {networkNodes.map((node, index) => {
                const agent = agents[index];
                const Icon = agent.icon;
                const isSelected = agent.id === selectedAgent.id;

                return (
                  <motion.button
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + index * 0.06 }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    onMouseEnter={() => setSelectedAgent(agent)}
                    className={`absolute rounded-2xl border border-white/15 bg-slate-900/85 px-3 py-4 text-center shadow-[0_15px_45px_rgba(0,0,0,.35)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/80 hover:shadow-[0_0_30px_rgba(34,211,238,.22)] ${
                      isSelected
                        ? "border-cyan-300/70 shadow-[0_0_24px_rgba(34,211,238,0.16)] ring-2 ring-cyan-400/50"
                        : ""
                    }`}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-1.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/70 text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="px-2 text-center text-[13px] font-semibold leading-snug text-white">
                        {agent.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="self-center rounded-[28px] border border-white/15 bg-slate-900/70 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAgent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.16)]">
                    <selectedAgent.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                      Selected Agent
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {selectedAgent.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-400">
                  {selectedAgent.description}
                </p>

                <div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                    Responsibilities
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {selectedAgent.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                      Primary Output
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                      {selectedAgent.output}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                      Example Result
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                      {selectedAgent.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3 sm:mt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/15 bg-slate-900/70 p-6 text-center shadow-[0_20px_70px_rgba(2,6,23,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_28px_rgba(34,211,238,0.15)]"
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">{stat.value}</h3>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
