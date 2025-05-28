import { useEffect, useState } from "react";
import "./citations.css";
import "../app.css";
import TooltipBox from "./TooltipBox";

function Citations({ data }) {
  const [quotes, setQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

      let learning = data
        .map((row) => row[learningKey])
        .filter((val) => val && val.trim().length > 10)
        .map((val) => ({ text: val, tag: "Positive aspect" }));

      let concerns = data
        .map((row) => row[concernKey])
        .filter((val) => val && val.trim().length > 10)
        .map((val) => ({ text: val, tag: "Concern" }));

      // Combine and shuffle both A and B
      const allQuotesArr = [...learning, ...concerns];
      const shuffled = allQuotesArr
        .map((q) => ({ ...q, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ text, tag }) => ({ text, tag }));

      setAllQuotes(shuffled.slice(0, 50));
    }
  }, [data]);

  useEffect(() => {
    if (filter === "all") {
      setQuotes(allQuotes);
    } else {
      setQuotes(allQuotes.filter((q) => q.tag === filter));
    }
  }, [allQuotes, filter]);

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

  // Dropdown handlers
  const handleDropdownToggle = () => setDropdownOpen((open) => !open);
  const handleFilterSelect = (val) => {
    setFilter(val);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="scrolling-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
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
              height: "28px",
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
              alt="Speech"
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
                Positive aspect: <br /> Describe one, if any, specific way you
                used AI to help with your learning.
                <br />
                Concern:
                <br />
                What concerns, if any, do you have about using AI for your
                education?
              </div>
            </TooltipBox>
          </div>
          <div style={{ position: "relative" }}>
            <select
              className="selector"
              value={filter}
              onChange={(e) => {
                handleFilterSelect(e.target.value);
              }}
              onBlur={() => setDropdownOpen(false)}
              style={{
                minWidth: 160,
                fontFamily: "Mona Sans",
                // Remove all inline background/border/color, use CSS
              }}
            >
              <option value="all">All</option>
              <option value="Positive aspect">Positive aspects</option>
              <option value="Concern">Concerns</option>
            </select>
          </div>
        </div>
        <div className="scrolling-track">
          {[...quotes, ...quotes].map((quote, index) => (
            <div className="quote" key={index}>
              <h3
                className="tag"
                style={{
                  fontWeight: "bold",
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
