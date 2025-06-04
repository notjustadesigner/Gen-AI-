import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ZAxis,
} from "recharts";
import "../app.css";

import TooltipBox from "../components/TooltipBox";

function Helpfulness({ data }) {
  const categories = {
    "Writing essays or text summaries": "Writing",
    "Solving math / Science / Physics problems": "STEM",
    "Doing my school assignments": "Assignments",
    "Language practice": "Language",
    "Studying / Memorising": "Studying",
    "Coding / programming help": "Coding",
    "Research / finding sources": "Research",
    "Creative tasks": "Creative",
    "Study planning / time management": "Planning",
  };

  const scores = {};
  const counts = {};

  Object.keys(categories).forEach((key) => {
    scores[key] = { sum: 0, count: 0 };
    counts[key] = 0;
  });

  data.forEach((row) => {
    const usageResp = row["For which of these purposes do you use AI?"];
    if (usageResp) {
      const selected = usageResp.split(",").map((s) => s.trim());
      selected.forEach((cat) => {
        if (counts.hasOwnProperty(cat)) {
          counts[cat]++;
        }
      });
    }

    Object.keys(categories).forEach((cat) => {
      const score =
        row[
          `How helpful do you find AI for each of these? (1=Not at all, 5=Extremely) [${cat}]`
        ];
      const num = parseFloat(score);
      if (!isNaN(num)) {
        scores[cat].sum += num;
        scores[cat].count++;
      }
    });
  });

  const chartData = Object.keys(categories).map((cat) => ({
    category: categories[cat],
    usage: counts[cat],
    helpfulness: scores[cat].count ? scores[cat].sum / scores[cat].count : 0,
    size: counts[cat] > 0 ? counts[cat] * 2 : 6, // minimum size 6, scale as needed
  }));

  // Map categories to icon filenames (must be in /public)
  const categoryIcons = {
    Writing: "essays.svg",
    STEM: "math.svg",
    Assignments: "assignments.svg",
    Language: "language.svg",
    Studying: "studying.svg",
    Coding: "coding.svg",
    Research: "research.svg",
    Creative: "creative.svg",
    Planning: "study.svg",
  };

  // Custom shape renderer for Scatter points
  const renderCustomIcon = (props) => {
    const { cx, cy, payload } = props;
    const icon = categoryIcons[payload.category] || "default.svg";
    // If usage is 0, use minimum size (8), else use the provided size or payload.size
    const usage = payload.usage || 0;
    const iconSize =
      usage === 0
        ? 20
        : (props.size !== undefined ? props.size : payload.size) || 16;
    return (
      <image
        href={`/${icon}`}
        x={cx - iconSize / 2}
        y={cy - iconSize / 2}
        width={iconSize}
        height={iconSize}
        style={{ pointerEvents: "auto" }}
      />
    );
  };

  // Tooltip state for the info tag
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
    <div className="chart">
      <div
        className="tag tag-tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        Top Use Cases
        <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src="/source.svg"
              alt="Source icon"
              style={{ width: 18, height: 18, marginRight: 4, marginBottom: 2 }}
            />
            <strong style={{ fontWeight: 700 }}>Source:</strong>
          </span>
          How helpful do you find AI for each of these? (1=Not at all,
          5=Extremely)
        </TooltipBox>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
          <CartesianGrid stroke="#404040" />
          <XAxis type="number" dataKey="usage" name="Usage">
            <Label
              value="Usage Frequency"
              offset={-10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="helpfulness"
            domain={[1, 5]}
            name="Helpfulness"
          >
            <Label
              value="Average Helpfulness"
              angle={-90}
              offset={-10}
              position="center"
            />
          </YAxis>
          <ZAxis dataKey="size" range={[20, 36]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              background: "#222",
              color: "#CFCFCF",
              border: "1px solid #404040",
              borderRadius: "1rem",
            }}
            itemStyle={{ color: "#CFCFCF" }}
            labelStyle={{ color: "#CFCFCF" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length && payload[0].payload) {
                const { category, usage, helpfulness } = payload[0].payload;
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      background: "#222",
                      color: "#CFCFCF",
                      border: "1px solid #404040",
                      borderRadius: "1rem",
                      padding: "0.75rem",
                    }}
                  >
                    <div>
                      Category: <strong>{category}</strong>
                    </div>
                    <div>
                      Usage: <strong>{usage}</strong>
                    </div>
                    <div>
                      Avg. Helpfulness:{" "}
                      <strong>{helpfulness.toFixed(2)}</strong>★
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter
            name="AI Tasks"
            data={chartData}
            fill="#CFCFCF"
            shape={renderCustomIcon}
            isAnimationActive={true}
            animationDuration={700}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Helpfulness;
