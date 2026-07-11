// Chat.jsx
// The Admission Chat page — a ChatGPT-style conversational interface for
// asking about eligibility, courses, hostel, placements, fees,
// scholarships, documents, admission process and important dates.
//
// Talks to the Flask backend via POST /api/chat (see api/axios.js).
// Falls back gracefully with an ErrorBanner if the backend is unreachable.

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import AppLayout from "../components/AppLayout.jsx";
import ChatMessage from "../components/ChatMessage.jsx";
import TypingIndicator from "../components/TypingIndicator.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import api from "../api/axios.js";

const SUGGESTED_QUESTIONS = [
  "What's the eligibility for B.Tech CSE?",
  "What scholarships are available?",
  "Show me the fee structure for MBA",
  "What documents do I need for admission?",
  "What is the admission process?",
  "Tell me about hostel facilities",
];

const WELCOME_MESSAGE = {
  sender: "assistant",
  message:
    "Hi! 👋 I'm your **College Admission Agent**. Ask me about eligibility, courses, hostel life, placements, fees, scholarships, required documents, the admission process, or important dates.",
  timestamp: new Date().toISOString(),
};

export default function Chat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const sessionId = useRef(`session-${Date.now()}`);

  // Auto-scroll to the latest message whenever messages/typing state changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError(null);
    const userMsg = { sender: "user", message: trimmed, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.post("/chat", {
        message: trimmed,
        session_id: sessionId.current,
      });
      const reply = res.data.data; // { sender, message, timestamp, session_id }
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <AppLayout title="Admission Chat">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col px-4 sm:px-6">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin py-6 space-y-5">
          {messages.map((m, i) => (
            <ChatMessage key={i} sender={m.sender} message={m.message} timestamp={m.timestamp} />
          ))}
          {isTyping && <TypingIndicator />}

          {/* Suggested questions (shown only at the start of the conversation) */}
          {messages.length === 1 && !isTyping && (
            <div className="pl-11 animate-fade-in">
              <p className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles size={13} /> Try asking
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs font-medium px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <ErrorBanner message={error} onRetry={() => sendMessage(messages.at(-1)?.message || "")} />}
        </div>

        {/* Input bar */}
        <form onSubmit={handleSubmit} className="py-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-5 pr-2 py-2 focus-within:ring-2 focus-within:ring-brand-500">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about eligibility, fees, scholarships..."
              className="flex-1 bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Responses are generated by a rule-based engine today — IBM watsonx.ai (Granite) integration is scaffolded and coming soon.
          </p>
        </form>
      </div>
    </AppLayout>
  );
}
