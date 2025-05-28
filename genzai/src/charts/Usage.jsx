import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../app.css";
import TooltipBox from "../components/TooltipBox";

function CategoryLogoTick({ x, y, payload }) {
  // Try to find a keyword in the category name to use as the SVG filename
  const keywords = [
    "essays",
    "math",
    "science",
    "physics",
    "assignments",
    "language",
    "studying",
    "memorising",
    "coding",
    "programming",
    "research",
    "creative",
    "study",
  ];
  const cat = payload.value.toLowerCase();
  let match = keywords.find((word) => cat.includes(word));
  // fallback to first word if no keyword matched
  if (!match) match = cat.split(" ")[0];
  const logoName = match.replace(/\s+/g, "") + ".svg";
  return (
    <g transform={`translate(${x - 42},${y - 16})`}>
      <image
        href={`/${logoName}`}
        x={0}
        y={0}
        width={28}
        height={28}
        style={{ objectFit: "contain" }}
        alt={payload.value}
      />
    </g>
  );
}

function Usage({ data }) {
  const useCategories = [
    "Writing essays or text summaries",
    "Solving math / Science / Physics problems",
    "Doing my school assignments",
    "Language practice",
    "Studying / Memorising",
    "Coding / programming help",
    "Research / finding sources",
    "Creative tasks",
    "Study planning / time management",
  ];

  const useCounts = Object.fromEntries(useCategories.map((cat) => [cat, 0]));

  data.forEach((row) => {
    const response = row["For which of these purposes do you use AI?"];
    if (response) {
      const selected = response.split(",").map((option) => option.trim());
      selected.forEach((option) => {
        if (useCounts.hasOwnProperty(option)) {
          useCounts[option]++;
        }
      });
    }
  });

  const chartData = useCategories.map((cat) => ({
    name: cat,
    count: useCounts[cat],
  }));

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
    <div className="chart">
      <div
        className="tag tag-tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ color: "#CFCFCF", position: "relative" }}
      >
        AI Usage Purpose
        <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src="/source.svg"
              alt="Source icon"
              style={{ width: 18, height: 18, marginRight: 4, marginBottom: 2 }}
            />
            <strong style={{ fontWeight: 700 }}>Source:</strong>
          </span>
          For which of these purposes do you use AI?
        </TooltipBox>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          <XAxis type="number" allowDecimals={false} stroke="#CFCFCF" />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#CFCFCF"
            tick={<CategoryLogoTick />}
          />
          <Tooltip
            contentStyle={{
              background: "#222",
              color: "#CFCFCF",
              border: "1px solid #404040",
              borderRadius: "1rem",
            }}
          />
          <Bar dataKey="count" fill="#CFCFCF" activeBar={{ fill: "#222" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Usage;
