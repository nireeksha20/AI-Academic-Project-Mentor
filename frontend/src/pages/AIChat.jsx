import { useSearchParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Send, Bot } from "lucide-react";

const prompts = {
  requirements: {
    title: "Requirement Analyzer",
    greeting:
      "Describe your project idea. I'll generate functional and non-functional requirements.",
  },
  techstack: {
    title: "Tech Stack Advisor",
    greeting:
      "Tell me your project domain and I'll recommend the best technology stack.",
  },
  architecture: {
    title: "Architecture Designer",
    greeting:
      "I'll help you design modules, ER diagrams and system architecture.",
  },
  debug: {
    title: "Code Debug Mentor",
    greeting: "Paste your error or code snippet to debug it.",
  },
  testing: {
    title: "Testing Assistant",
    greeting: "I'll generate test cases and edge-case scenarios.",
  },
  presentation: {
    title: "Presentation Coach",
    greeting: "I'll prepare viva questions and presentation guidance.",
  },
};

export default function AIChat() {
  const [params] = useSearchParams();
  const agent = params.get("agent") || "requirements";

  const config = useMemo(() => prompts[agent], [agent]);

  const [messages, setMessages] = useState([
    { role: "assistant", text: config.greeting },
  ]);

  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/mentor" className="text-cyan-400 hover:underline">
          ← Back to AI Mentor
        </Link>

        <div className="flex items-center gap-3 mt-6 mb-8">
          <Bot className="text-cyan-400" size={34} />
          <h1 className="text-3xl font-bold">{config.title}</h1>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 h-[520px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  m.role === "assistant"
                    ? "bg-slate-800"
                    : "bg-cyan-500 ml-auto text-black"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your assistant..."
              className="flex-1 rounded-xl bg-slate-800 px-4 py-3 outline-none"
            />

            <button onClick={send} className="rounded-xl bg-cyan-500 px-5">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
