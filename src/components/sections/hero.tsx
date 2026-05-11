"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1.5 text-[11px] text-fg-2 bg-surface border border-border font-mono tracking-[0.04em]">
      <span
        className="w-1.5 h-1.5 bg-fg-2"
        style={{ animation: "pulse 2.4s ease-in-out infinite" }}
      />
      {children}
    </span>
  );
}

function AssessmentScaffold() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((p) => p + dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const ROWS = [
    "01 Structure",
    "02 Economics",
    "03 Liquidity",
    "04 Operations",
    "05 Distribution",
  ];
  const CYCLE = 14;
  const u = (t % CYCLE) / CYCLE;
  const N = ROWS.length;
  const rowProgress = u * N;
  const rowIdx = Math.min(N - 1, Math.floor(rowProgress));
  const within = rowProgress - rowIdx;
  const eased = within < 0.6 ? 0 : (within - 0.6) / 0.4;
  const dotY = rowIdx + Math.min(1, eased);

  const W = 760,
    H = 520;
  const padL = 80,
    padR = 60,
    padT = 50,
    padB = 50;
  const colH = H - padT - padB;
  const rowGap = colH / (N - 1);
  const yFor = (i: number) => padT + i * rowGap;

  const activeRow = Math.round(dotY);
  const onRow = Math.abs(dotY - activeRow) < 0.15;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      className="block"
    >
      {/* Vertical guide */}
      <line x1={padL} y1={padT - 20} x2={padL} y2={H - padB + 20} stroke="var(--border)" strokeWidth="1" />
      <line x1={padL - 6} y1={padT - 20} x2={padL + 6} y2={padT - 20} stroke="var(--border-2)" strokeWidth="1" />
      <line x1={padL - 6} y1={H - padB + 20} x2={padL + 6} y2={H - padB + 20} stroke="var(--border-2)" strokeWidth="1" />

      {ROWS.map((label, i) => {
        const y = yFor(i);
        const isActive = activeRow === i && onRow;
        return (
          <g key={i}>
            <line
              x1={padL} y1={y} x2={W - padR} y2={y}
              stroke={isActive ? "var(--fg-2)" : "var(--border)"}
              strokeWidth="1"
              style={{ transition: "stroke .35s" }}
            />
            <text
              x={padL - 14} y={y + 3} textAnchor="end"
              fontFamily="'JetBrains Mono', monospace" fontSize="10"
              fill={isActive ? "var(--fg-2)" : "var(--muted)"}
              style={{ transition: "fill .35s" }}
            >
              {label.split(" ")[0]}
            </text>
            <text
              x={padL + 14} y={y - 8}
              fontFamily="'Newsreader', serif" fontSize="13"
              fill={isActive ? "var(--fg)" : "var(--muted)"}
              style={{ transition: "fill .35s" }}
            >
              {label.substring(3)}
            </text>
            <g opacity={isActive ? 1 : 0.25} style={{ transition: "opacity .35s" }}>
              <line x1={W - padR - 16} y1={y - 4} x2={W - padR - 8} y2={y + 4} stroke={isActive ? "var(--accent)" : "var(--border-2)"} strokeWidth="1.25" />
              <line x1={W - padR - 8} y1={y + 4} x2={W - padR + 4} y2={y - 8} stroke={isActive ? "var(--accent)" : "var(--border-2)"} strokeWidth="1.25" />
            </g>
          </g>
        );
      })}

      {/* Traveling mark */}
      <g transform={`translate(${padL}, ${padT + rowGap * dotY})`}>
        <line x1={-12} y1={0} x2={W - padR - padL + 12} y2={0} stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1" />
        <rect x={-3} y={-3} width="6" height="6" fill="var(--accent)" />
      </g>

      {/* Labels */}
      <text x={W - padR} y={padT - 28} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="var(--muted)">
        / assessment scaffold
      </text>
      <text x={padL + 14} y={H - padB + 35} fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="var(--muted)">
        v1.0 · fixed scope · {ROWS.length} questions
      </text>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 grid md:grid-cols-[6fr_5fr] gap-8 md:gap-16 items-center">
        <div>
          <StatusPill>independent assessment work for tokenized financial products</StatusPill>
          <h1 className="display mt-7 text-[44px] leading-[0.98] md:text-[72px] md:leading-[0.98] text-fg" style={{ textWrap: "balance", letterSpacing: "0em" }}>
            Tokenized does not mean underwritable.
          </h1>
          <p className="mt-8 text-[17px] text-fg-2 max-w-[540px] leading-relaxed">
            The next phase of tokenized finance belongs to products that can survive real scrutiny.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">
              View services
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <AssessmentScaffold />
        </div>
      </div>
    </section>
  );
}
