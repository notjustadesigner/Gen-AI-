import React, { useState } from "react";
import "./topBar.css";
import InfoModal from "./InfoModal";

const TopBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="topbar">
      <img src="./Logo.svg" alt="Logo" className="topbar-logo" />
      <button
        className="topbar-info-btn"
        aria-label="Info"
        onClick={() => setModalOpen(true)}
      >
        Info
      </button>
      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TopBar;
