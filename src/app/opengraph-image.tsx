import { ImageResponse } from "next/og";

export const alt =
  "altrntv labs — independent assessments for tokenized financial products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const bg = "#0C0B09";
  const fg = "#EAE7E1";
  const fg2 = "#C9C5BD";
  const muted = "#8A857B";
  const muted2 = "#5A554B";
  const border = "#221E18";
  const border2 = "#2D2820";
  const accent = "#D4541F";

  const ROWS = ["Structure", "Economics", "Liquidity", "Operations", "Distribution"];
  const scaffoldLeft = 780;
  const scaffoldTop = 110;
  const rowGap = 88;

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

        {/* Assessment scaffold rows */}
        {ROWS.map((label, i) => {
          const y = scaffoldTop + i * rowGap;
          const isActive = i === 2;
          return (
            <div key={i} style={{ position: "absolute", display: "flex" }}>
              {/* Row number */}
              <div
                style={{
                  position: "absolute",
                  left: scaffoldLeft - 36,
                  top: y - 7,
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: isActive ? fg2 : muted,
                  display: "flex",
                }}
              >
                {`0${i + 1}`}
              </div>
              {/* Row label */}
              <div
                style={{
                  position: "absolute",
                  left: scaffoldLeft + 14,
                  top: y - 22,
                  fontSize: 13,
                  fontFamily: "sans-serif",
                  color: isActive ? fg : muted2,
                  letterSpacing: "0.03em",
                  display: "flex",
                }}
              >
                {label}
              </div>
              {/* Horizontal line */}
              <div
                style={{
                  position: "absolute",
                  left: scaffoldLeft,
                  top: y,
                  width: 360,
                  height: 1,
                  background: isActive ? fg2 : border,
                  display: "flex",
                }}
              />
              {/* Checkmarks for completed rows */}
              {i < 2 && (
                <div
                  style={{
                    position: "absolute",
                    left: scaffoldLeft + 330,
                    top: y - 8,
                    fontSize: 14,
                    color: accent,
                    opacity: 0.6,
                    display: "flex",
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          );
        })}

        {/* Vertical guide line */}
        <div
          style={{
            position: "absolute",
            left: scaffoldLeft,
            top: scaffoldTop - 20,
            width: 1,
            height: rowGap * (ROWS.length - 1) + 40,
            background: border2,
            display: "flex",
          }}
        />

        {/* Active row accent line */}
        <div
          style={{
            position: "absolute",
            left: scaffoldLeft - 12,
            top: scaffoldTop + 2 * rowGap,
            width: 384,
            height: 1,
            background: accent,
            opacity: 0.18,
            display: "flex",
          }}
        />
        {/* Active row dot */}
        <div
          style={{
            position: "absolute",
            left: scaffoldLeft - 3,
            top: scaffoldTop + 2 * rowGap - 3,
            width: 6,
            height: 6,
            background: accent,
            display: "flex",
          }}
        />

        {/* Scaffold label */}
        <div
          style={{
            position: "absolute",
            right: 68,
            top: scaffoldTop - 32,
            fontSize: 10,
            fontFamily: "monospace",
            color: muted,
            display: "flex",
          }}
        >
          / assessment scaffold
        </div>

        {/* Version label */}
        <div
          style={{
            position: "absolute",
            left: scaffoldLeft + 14,
            top: scaffoldTop + rowGap * (ROWS.length - 1) + 22,
            fontSize: 10,
            fontFamily: "monospace",
            color: muted,
            display: "flex",
          }}
        >
          v1.0 · fixed scope · 5 questions
        </div>

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
              fontSize: 72,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: fg,
              maxWidth: 700,
            }}
          >
            <div style={{ display: "flex" }}>Independent</div>
            <div style={{ display: "flex" }}>assessments for</div>
            <div style={{ display: "flex" }}>tokenized finance.</div>
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
                fontSize: 14,
                color: muted2,
                letterSpacing: "0.06em",
                display: "flex",
                fontFamily: "monospace",
              }}
            >
              structure · economics · liquidity · operations · distribution
            </div>
            <div
              style={{
                fontSize: 16,
                color: accent,
                letterSpacing: "0.14em",
                display: "flex",
              }}
            >
              altrntv.io
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
