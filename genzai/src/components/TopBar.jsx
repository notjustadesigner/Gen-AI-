import React from "react";
import "./topBar.css";

const TopBar = () => (
    <div className="topbar">
        <img src="./Logo.svg" alt="Logo" className="topbar-logo" />
        <button
            className="topbar-info-btn"
            aria-label="Info"
            onClick={() => alert("Info button clicked!")}
        >
            Info
        </button>
    </div>
);

export default TopBar;