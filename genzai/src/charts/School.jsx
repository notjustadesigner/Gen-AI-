import React, { useState } from "react";
import "../app.css";
import TooltipBox from "../components/TooltipBox";

const COLORS = ["#CFCFCF", "#303030"]; // YES: #CFCFCF, NO: #303030

function School({ data }) {
  const aiOutsideSchoolData = (() => {
    const counts = { Yes: 0, No: 0 };

    data.forEach((row) => {
      const answer =
        row[
          "Does your school officially allow the use of AI tools for assignments?"
        ]?.trim();
      if (answer === "Yes" || answer === "No") {
        counts[answer]++;
      }
    });

    // Ensure order: YES first, NO second
    return [
      { name: "Legal", value: counts["Yes"] },
      { name: "Illegal", value: counts["No"] },
    ];
  })();

  // Calculate percentages for 100 icons
  const total = aiOutsideSchoolData[0].value + aiOutsideSchoolData[1].value;
  const legalCount =
    total === 0 ? 0 : Math.round((aiOutsideSchoolData[0].value / total) * 100);
  const illegalCount = 100 - legalCount;

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

  // Helper for coloring SVG icons using CSS filter (same as AIUse)
  const getFilter = (color) => {
    if (color === "#CFCFCF") {
      // Legal (light)
      return "invert(13%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%)";
    }
    // Illegal (dark)
    return "invert(99%) sepia(1%) saturate(0%) hue-rotate(180deg) brightness(95%)";
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
        School AI Policy
        <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src="/source.svg"
              alt="Source icon"
              style={{ width: 18, height: 18, marginRight: 4, marginBottom: 2 }}
            />
            <strong style={{ fontWeight: 700 }}>Source:</strong>
          </span>
          Does your school officially allow the use of AI tools for assignments?
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
          <img
            key={i}
            src="/school.svg"
            alt="School icon"
            width={24}
            height={24}
            style={{
              filter: getFilter(i < legalCount ? COLORS[0] : COLORS[1]),
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <img
            src="/school.svg"
            alt="School icon"
            width={20}
            height={20}
            style={{ filter: getFilter(COLORS[0]) }}
          />
          <span style={{ color: COLORS[0] }}>{legalCount}% Legal</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <img
            src="/school.svg"
            alt="School icon"
            width={20}
            height={20}
            style={{ filter: getFilter(COLORS[1]) }}
          />
          <span style={{ color: COLORS[1] }}>{illegalCount}% Illegal</span>
        </span>
      </div>
    </div>
  );
}

export default School;
