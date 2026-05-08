import { ImageResponse } from "next/og";

export const alt =
  "altrntv labs — independent assessments for tokenized financial products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Note: using satori's default sans. Custom fonts can be re-added by
  // bundling .ttf files in /public/fonts and reading them with fs at build.
  const bg = "#0a0b0d";
  const fg = "#e8e9eb";
  const muted = "#8a8f98";
  const border = "#1e2126";
  const accent = "#c9a24a";

  // Capital-flow diagram, scaled & positioned for the OG canvas
  const D = { x: 920, y: 330 };
  const satellites = [
    { x: 1060, y: 180 },
    { x: 1110, y: 320 },
    { x: 1060, y: 480 },
    { x: 940, y: 540 },
    { x: 800, y: 510 },
    { x: 780, y: 180 },
    { x: 920, y: 150 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          color: fg,
          display: "flex",
          position: "relative",
        }}
      >
        {/* Hairline plate frame */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: `1px solid ${border}`,
          }}
        />

        {/* Capital-flow diagram (static SVG) */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Pre-D progressive stages on the journey */}
          {[
            { x: 480, r: 3, op: 0.4 },
            { x: 600, r: 5, op: 0.6 },
            { x: 720, r: 8, op: 0.85 },
          ].map((s, i) => (
            <circle
              key={`stage-${i}`}
              cx={s.x}
              cy={D.y}
              r={s.r}
              fill={bg}
              stroke={muted}
              strokeWidth={1}
              opacity={s.op}
            />
          ))}
          {/* Journey axis */}
          <line
            x1={480}
            y1={D.y}
            x2={D.x}
            y2={D.y}
            stroke={border}
            strokeWidth={1}
            opacity={0.7}
          />
          {/* Capital connection streams */}
          {satellites.map((s, i) => (
            <line
              key={`l-${i}`}
              x1={s.x}
              y1={s.y}
              x2={D.x}
              y2={D.y}
              stroke={border}
              strokeWidth={1}
              opacity={0.7}
            />
          ))}
          {/* Satellite (capital pool) nodes */}
          {satellites.map((s, i) => (
            <g key={`s-${i}`}>
              <circle
                cx={s.x}
                cy={s.y}
                r={5}
                fill={bg}
                stroke={muted}
                strokeWidth={1}
              />
              <circle cx={s.x} cy={s.y} r={1.6} fill={muted} />
            </g>
          ))}
          {/* Frozen-in-flight capital particles along each stream */}
          {satellites.map((s, i) => {
            const t = 0.35 + (i % 3) * 0.18;
            const px = s.x + (D.x - s.x) * t;
            const py = s.y + (D.y - s.y) * t;
            return (
              <circle key={`p-${i}`} cx={px} cy={py} r={3.2} fill={accent} />
            );
          })}
          {/* Matured product node — halos + ring + center */}
          <circle
            cx={D.x}
            cy={D.y}
            r={48}
            fill="none"
            stroke={accent}
            strokeWidth={1}
            opacity={0.18}
          />
          <circle
            cx={D.x}
            cy={D.y}
            r={32}
            fill="none"
            stroke={accent}
            strokeWidth={1}
            opacity={0.45}
          />
          <circle
            cx={D.x}
            cy={D.y}
            r={22}
            fill={bg}
            stroke={accent}
            strokeWidth={1.5}
          />
          <circle cx={D.x} cy={D.y} r={5} fill={accent} />
        </svg>

        {/* Content overlay */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: 80,
          }}
        >
          {/* Top: wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 8,
                height: 8,
                background: accent,
                borderRadius: 999,
              }}
            />
            <div
              style={{
                  fontSize: 20,
                letterSpacing: "0.14em",
                color: muted,
                display: "flex",
              }}
            >
              altrntv labs
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: fg,
              maxWidth: 780,
            }}
          >
            <div style={{ display: "flex" }}>Independent</div>
            <div style={{ display: "flex" }}>assessments for</div>
            <div style={{ display: "flex" }}>tokenized financial</div>
            <div style={{ display: "flex" }}>products.</div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                  fontSize: 18,
                color: muted,
                letterSpacing: "0.04em",
                display: "flex",
              }}
            >
              {/* fixed-scope · independent · decision-grade */}
            </div>
            <div
              style={{
                  fontSize: 16,
                color: accent,
                letterSpacing: "0.14em",
                display: "flex",
              }}
            >
              altrntv.xyz
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
