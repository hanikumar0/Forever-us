"use client";

import React, { useEffect, useState } from "react";

export default function ErrorLogger() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setLogs((prev) => [
        ...prev,
        `Error: ${event.message} at ${event.filename || "unknown"}:${event.lineno || 0}`,
      ]);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      setLogs((prev) => [
        ...prev,
        `Promise Rejected: ${event.reason ? (event.reason.message || String(event.reason)) : "unknown reason"}`,
      ]);
    };

    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      const formattedArgs = args
        .map((a) => {
          if (a instanceof Error) return a.message + "\n" + a.stack;
          if (a && typeof a === "object") {
            try {
              return JSON.stringify(a);
            } catch {
              return String(a);
            }
          }
          return String(a);
        })
        .join(" ");
      
      setLogs((prev) => [...prev, `Console Error: ${formattedArgs}`]);
      originalConsoleError.apply(console, args as unknown as Parameters<typeof console.error>);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      console.error = originalConsoleError;
    };
  }, []);

  if (logs.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] bg-black/95 text-red-400 p-4 max-h-[300px] overflow-y-auto text-xs font-mono select-text border-b border-red-500/50 flex flex-col gap-2">
      <div className="font-bold flex justify-between items-center text-red-500">
        <span>⚠️ Client-Side Runtime Errors Detected ({logs.length})</span>
        <button
          onClick={() => setLogs([])}
          className="px-2 py-1 bg-red-950/80 hover:bg-red-900/80 text-red-200 rounded border border-red-500/30 transition-all cursor-pointer"
        >
          Dismiss
        </button>
      </div>
      <ul className="space-y-1.5 list-disc pl-4">
        {logs.map((log, idx) => (
          <li key={idx} className="whitespace-pre-wrap font-sans text-[11px] leading-relaxed select-all">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}
