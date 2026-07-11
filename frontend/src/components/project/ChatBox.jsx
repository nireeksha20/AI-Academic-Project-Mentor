import { useState, useEffect, useRef } from "react";
import { Send, User, BrainCircuit } from "lucide-react";
import { chatService } from "../../services/chatService";

export default function ChatBox({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadChat = async () => {
      try {
        const response = await chatService.getHistory(projectId);
        if (response.success) {
          setMessages(response.data?.history || []);
        }
      } catch (error) {
        console.error("Failed to load chat history", error);
      }
    };
    if (projectId) {
      loadChat();
    }
  }, [projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { message: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatService.sendMessage(projectId, userMessage);
      if (response.success) {
        setMessages((prev) => {
          // Replace the optimistic message with the one from the DB
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = response.data.chat;
          return newMessages;
        });

        // Simulate AI response for now (since backend doesn't trigger real AI yet)
        setTimeout(async () => {
          const aiResponse = await chatService.sendMessage(projectId, {
            message: "I am an AI. I have logged your message.",
            sender: "ai",
          });
          if (aiResponse.success) {
            setMessages((prev) => [...prev, aiResponse.data.chat]);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[500px] flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <BrainCircuit className="text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">AI Mentor Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-500">
            Start a conversation with your AI Mentor.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={msg._id || idx}
              className={`flex gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.sender === "user"
                    ? "bg-violet-500 text-white"
                    : "bg-cyan-500/20 text-cyan-400"
                }`}
              >
                {msg.sender === "user" ? <User size={16} /> : <BrainCircuit size={16} />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "bg-violet-500/20 text-violet-100 border border-violet-500/30"
                    : "bg-cyan-500/10 text-cyan-100 border border-cyan-400/20"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI for project guidance..."
          className="flex-1 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-cyan-400"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
