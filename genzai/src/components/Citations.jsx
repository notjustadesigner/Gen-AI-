import { useEffect, useState } from "react";
import "./citations.css";
import "../app.css";
import TooltipBox from "./TooltipBox";

function Citations({ data }) {
  const [quotes, setQuotes] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    if (data.length > 0) {
      // Print all keys for every row to debug whitespace issues
      data.forEach((row, i) => {
        console.log(`Row ${i} keys:`, Object.keys(row));
      });

      // Find keys dynamically to avoid whitespace issues
      const learningKey = Object.keys(data[0]).find(
        (k) =>
          k.trim() ===
          "Describe one, if any, specific way you used AI to help with your learning."
      );
      const concernKey = Object.keys(data[0]).find(
        (k) =>
          k.trim() ===
          "What concerns, if any, do you have about using AI for your education?"
      );
      console.log("Resolved concernKey:", concernKey);

      let learning = data
        .map((row) => row[learningKey])
        .filter((val) => val && val.trim().length > 10)
        .map((val) => ({ text: val, tag: "A" }));

      let concerns = data
        .map((row) => row[concernKey])
        .filter((val) => val && val.trim().length > 10)
        .map((val) => ({ text: val, tag: "B" }));

      // Combine and shuffle both A and B
      const allQuotes = [...learning, ...concerns];
      const shuffled = allQuotes
        .map((q) => ({ ...q, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ text, tag }) => ({ text, tag }));

      setQuotes(shuffled.slice(0, 50));
    }
  }, [data]);

  // Tooltip handlers for the main tag
  const handleTagMouseEnter = (e) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleTagMouseMove = (e) => {
    setTooltip((t) => ({
      ...t,
      x: e.clientX,
      y: e.clientY,
    }));
  };
  const handleTagMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  return (
    <>
      <div className="scrolling-container">
        <div
          className="tag tag-tooltip"
          onMouseEnter={handleTagMouseEnter}
          onMouseMove={handleTagMouseMove}
          onMouseLeave={handleTagMouseLeave}
          tabIndex={0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <img
            src="/speech.svg"
            style={{
              width: 18,
              height: 18,
              marginRight: 4,
              marginBottom: 2,
            }}
          />
          Students are saying...
          <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <img
                src="/source.svg"
                alt="Source icon"
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 4,
                  marginBottom: 2,
                }}
              />
              <strong style={{ fontWeight: 700 }}>Source:</strong>
            </span>
            <div style={{ marginTop: 4 }}>
              <b>A</b>: Describe one, if any, specific way you used AI to help
              with your learning.
              <br />
              <b>B</b>: What concerns, if any, do you have about using AI for
              your education?
            </div>
          </TooltipBox>
        </div>
        <div className="scrolling-track">
          {[...quotes, ...quotes].map((quote, index) => (
            <div className="quote" key={index}>
              <h3
                className="tag"
                style={{
                  fontWeight: "bold",
                  width: "32px",
                  height: "32px",
                  padding: 0,
                  fontFamily: "Mona Sans",
                }}
              >
                {quote.tag}
              </h3>
              "{quote.text.trim()}"
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Citations;
