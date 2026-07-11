// ChatMessage.jsx
// Renders a single chat bubble — either from the user or the AI assistant.
// Assistant messages support Markdown (bold, lists, etc.) via react-markdown.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ sender, message, timestamp }) {
  const isUser = sender === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""} animate-slide-up`}>
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-brand-600 text-white"
            : "bg-slate-200 dark:bg-slate-700 text-brand-700 dark:text-brand-300"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-brand-600 text-white rounded-tr-sm"
            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <p>{message}</p>
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
          </div>
        )}
        {timestamp && (
          <div className={`mt-1 text-[10px] ${isUser ? "text-brand-100/80" : "text-slate-400"}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        )}
      </div>
    </div>
  );
}
