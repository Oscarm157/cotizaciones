"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { from: "client" | "agent"; text: string };

type UI = {
  title: string;
  status: string;
  badge: string;
  placeholder: string;
  typing: string;
};

/**
 * Demo de chat que se reproduce solo: revela los mensajes uno a uno, muestra
 * "escribiendo…" antes de cada respuesta del agente, hace auto-scroll y al
 * terminar reinicia en loop. Pausa al pasar el cursor. Con prefers-reduced-motion
 * muestra toda la conversación estática. Solo pantalla (en PDF va el transcript).
 */
export function LiveChat({ messages, ui }: { messages: readonly Msg[]; ui: UI }) {
  const [count, setCount] = useState(0); // mensajes ya visibles
  const [typing, setTyping] = useState(false);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) {
      setCount(messages.length);
      setTyping(false);
      return;
    }

    // Un solo timer activo a la vez (timerRef), siempre cancelable en el cleanup.
    const schedule = (fn: () => void, ms: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(fn, ms);
    };
    const run = () => {
      if (pausedRef.current) {
        schedule(run, 300);
        return;
      }
      if (count >= messages.length) {
        schedule(() => {
          setTyping(false);
          setCount(0);
        }, 3600);
        return;
      }
      const next = messages[count];
      if (next.from === "agent") {
        setTyping(true);
        schedule(() => {
          setTyping(false);
          setCount((c) => c + 1);
        }, 1150);
      } else {
        schedule(() => setCount((c) => c + 1), 750);
      }
    };
    schedule(run, 450);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [count, reduce, messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (count === 0) {
      el.scrollTop = 0;
      return;
    }
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [count, typing, reduce]);

  return (
    <div
      className="screen-only rounded-xl border border-card-border bg-card overflow-hidden flex flex-col shadow-sm"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Header del chat */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-card-border bg-surface-muted/60">
        <div className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14, fontVariationSettings: "'wght' 600" }}
          >
            support_agent
          </span>
        </div>
        <div>
          <div className="text-[11.5px] font-semibold text-foreground leading-none">{ui.title}</div>
          <div className="text-[9.5px] text-muted mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            {ui.status}
          </div>
        </div>
        <div className="ml-auto text-[9px] uppercase tracking-[0.18em] font-semibold text-accent">
          {ui.badge}
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="h-[260px] sm:h-[280px] overflow-y-auto scrollbar-hide p-3 flex flex-col justify-end gap-2">
        {messages.slice(0, count).map((m, i) => {
          const isAgent = m.from === "agent";
          return (
            <div key={i} className={`flex ${isAgent ? "justify-start" : "justify-end"} chat-in`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${
                  isAgent
                    ? "bg-accent text-white rounded-tl-sm"
                    : "bg-surface-muted text-foreground rounded-tr-sm border border-card-border"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="flex justify-start chat-in">
            <div className="bg-accent/90 text-white rounded-2xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
              <span className="sr-only">{ui.typing}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input simulado */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-card-border">
        <div className="flex-1 text-[11px] text-muted/70 italic">{ui.placeholder}</div>
        <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14, fontVariationSettings: "'wght' 700" }}
          >
            send
          </span>
        </div>
      </div>

      <style>{`
        .chat-in { animation: chatIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .typing-dot {
          width: 6px; height: 6px; border-radius: 9999px;
          background: rgba(255,255,255,0.9); display: inline-block;
          animation: typingBounce 1.1s ease-in-out infinite;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-in { animation: none; }
          .typing-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
