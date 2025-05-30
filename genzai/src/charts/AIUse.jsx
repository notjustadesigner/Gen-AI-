import React, { useState } from "react";
import "../app.css";
import TooltipBox from "../components/TooltipBox";

const COLORS = ["#CFCFCF", "#303030"]; // YES: #CFCFCF, NO: #303030

function AIUse({ data }) {
  // Count Yes/No answers
  const counts = { Yes: 0, No: 0 };
  data.forEach((row) => {
    const answer =
      row[
        "Do you ever use AI tools (ChatGPT or similar) for your learning outside of a school context?"
      ]?.trim();
    if (answer === "Yes" || answer === "No") {
      counts[answer]++;
    }
  });
  const total = counts.Yes + counts.No;
  // Calculate number of Yes/No icons out of 100
  const yesCount = total > 0 ? Math.round((counts.Yes / total) * 100) : 0;
  const noCount = 100 - yesCount;

  // SVG as a React component (updated to new icon)
  const PersonSVG = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
      <path
        d="M10.0002 10.8333C12.3013 10.8333 14.1668 8.96785 14.1668 6.66667C14.1668 4.36548 12.3013 2.5 10.0002 2.5C7.69898 2.5 5.8335 4.36548 5.8335 6.66667C5.8335 8.96785 7.69898 10.8333 10.0002 10.8333Z"
        fill={color}
      />
      <path
        d="M16.6668 17.5C16.6668 15.7319 15.9645 14.0362 14.7142 12.786C13.464 11.5357 11.7683 10.8333 10.0002 10.8333C8.23205 10.8333 6.53636 11.5357 5.28612 12.786C4.03588 14.0362 3.3335 15.7319 3.3335 17.5"
        fill={color}
      />
      <path
        d="M10.0002 10.8333C12.3013 10.8333 14.1668 8.96785 14.1668 6.66667C14.1668 4.36548 12.3013 2.5 10.0002 2.5C7.69898 2.5 5.8335 4.36548 5.8335 6.66667C5.8335 8.96785 7.69898 10.8333 10.0002 10.8333ZM10.0002 10.8333C11.7683 10.8333 13.464 11.5357 14.7142 12.786C15.9645 14.0362 16.6668 15.7319 16.6668 17.5H3.3335C3.3335 15.7319 4.03588 14.0362 5.28612 12.786C6.53636 11.5357 8.23205 10.8333 10.0002 10.8333Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Tooltip state
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleMouseMove = (e) => {
    setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
  };
  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };

  return (
    <div
      className="chart"
      style={{ flexDirection: "column", alignItems: "flex-start" }}
    >
      <div
        className="tag tag-tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        Students using AI
        <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src="/source.svg"
              alt="Source icon"
              style={{ width: 18, height: 18, marginRight: 4, marginBottom: 2 }}
            />
            <strong style={{ fontWeight: 700 }}>Source:</strong>
          </span>
          Do you ever use AI tools (ChatGPT or similar) for your learning
          outside of a school context?
        </TooltipBox>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.2rem",
          width: "100%",
          minHeight: 140,
          margin: "1rem 0",
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <PersonSVG key={i} color={i < yesCount ? COLORS[0] : COLORS[1]} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <PersonSVG color={COLORS[0]} />{" "}
          <span style={{ color: COLORS[0] }}>{yesCount}% Uses AI</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <PersonSVG color={COLORS[1]} />{" "}
          <span style={{ color: COLORS[1] }}>{noCount}% Not uses AI</span>
        </span>
      </div>
    </div>
  );
}

export default AIUse;
