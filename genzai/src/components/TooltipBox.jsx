import React from "react";

function TooltipBox({
  visible,
  x,
  y,
  children,
  minWidth = 220,
  maxWidth = 320,
}) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        left: x + 12,
        top: y + 12,
        background: "#222",
        color: "#CFCFCF",
        border: "1px solid #404040",
        borderRadius: "1rem",
        padding: "0.5rem 0.75rem",
        zIndex: 10000,
        pointerEvents: "none",
        minWidth,
        maxWidth,
        margin,
      }}
    >
      {children}
    </div>
  );
}

export default TooltipBox;
