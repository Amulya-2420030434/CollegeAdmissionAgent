// TypingIndicator.jsx
// Small "AI is typing..." bubble with three bouncing dots, shown while
// waiting for the /chat API response. Mirrors the assistant bubble style
// so it feels like a natural continuation of the conversation.

import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-brand-700 dark:text-brand-300">
        <Bot size={16} />
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce-dot [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce-dot [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce-dot" />
      </div>
    </div>
  );
}
