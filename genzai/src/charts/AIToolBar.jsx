import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../app.css";
import TooltipBox from "../components/TooltipBox";

function ToolLogoTick({ x, y, payload }) {
  const logoName = payload.value.toLowerCase().replace(/\s+/g, "") + ".svg";
  return (
    <g transform={`translate(${x},${y})`}>
      <image
        href={`/${logoName}`}
        x={-16}
        y={8}
        width={28}
        height={28}
        style={{ objectFit: "contain" }}
        alt={payload.value}
      />
    </g>
  );
}

function AIToolsBar({ data }) {
  const toolCounts = {};

  data.forEach((row) => {
    const toolsStr = row["Which AI/LLM tools have you used?"]?.trim();
    if (toolsStr) {
      toolsStr.split(/[,;]/).forEach((tool) => {
        const cleanTool = tool.trim().toLowerCase();
        if (cleanTool) {
          const formattedTool =
            cleanTool.charAt(0).toUpperCase() + cleanTool.slice(1);
          toolCounts[formattedTool] = (toolCounts[formattedTool] || 0) + 1;
        }
      });
    }
  });

  const barData = Object.entries(toolCounts).map(([name, count]) => ({
    name,
    count,
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
        style={{ position: "relative" }}
      >
        Top AI Tools
        <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src="/source.svg"
              alt="Source icon"
              style={{ width: 18, height: 18, marginRight: 4, marginBottom: 2 }}
            />
            <strong style={{ fontWeight: 700 }}>Source:</strong>
          </span>
          Which AI/LLM tools have you used?
        </TooltipBox>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          <XAxis
            dataKey="name"
            stroke="#CFCFCF"
            tick={<ToolLogoTick />}
            interval={0}
            height={48}
          />
          <YAxis allowDecimals={false} stroke="#CFCFCF" />
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

export default AIToolsBar;
