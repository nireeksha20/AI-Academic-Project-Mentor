import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, LoaderCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MentorCard({ projectId }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "Hello! I'm your AI Faculty Mentor. Ask me anything about your project implementation, debugging, planning, architecture or deployment.",
    },
  ]);

  const bottomRef = useRef(null);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const askMentor = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      message: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/v1/chat/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: currentQuestion,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: data.data.aiMessage.message,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: "Unable to generate a response.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Server error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={chatContainerRef}
        className="h-[550px] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/80 p-6 space-y-6"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-black">
                <Bot size={20} />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-3xl px-5 py-4 whitespace-pre-wrap leading-7 shadow-lg ${
                msg.sender === "user"
                  ? "rounded-br-md bg-cyan-500 text-black"
                  : "rounded-bl-md border border-white/10 bg-slate-800 text-slate-100"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-3 leading-7">{children}</p>
                  ),

                  ul: ({ children }) => (
                    <ul className="ml-6 list-disc space-y-2">{children}</ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="ml-6 list-decimal space-y-2">{children}</ol>
                  ),

                  li: ({ children }) => <li>{children}</li>,

                  code({ inline, children }) {
                    if (inline) {
                      return (
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-cyan-300">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4">
                        <code>{children}</code>
                      </pre>
                    );
                  },
                }}
              >
                {msg.message}
              </ReactMarkdown>
            </div>

            {msg.sender === "user" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                <User size={20} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-black">
              <Bot size={20} />
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-800 px-5 py-4">
              <LoaderCircle className="animate-spin text-cyan-400" size={18} />

              <span className="text-slate-300">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <textarea
          rows={2}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your AI Mentor..."
          className="flex-1 rounded-xl border border-white/10 bg-slate-950 p-4 text-white outline-none"
        />

        <button
          onClick={askMentor}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-6 text-black hover:bg-cyan-400"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
