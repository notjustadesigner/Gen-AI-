import React from "react";
import "./infoModal.css";

export default function InfoModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="info-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <h2>What is Generation[AI]?</h2>
        <p>
          Generation[AI] is an open-data visualisation project that explores a
          simple but urgent question:
          <br />
          <b>How are students using AI, and why isn’t school keeping up?</b>
        </p>
        <p>
          From ChatGPT to Gemini to Claude, AI tools are already deeply woven
          into students' learning routines.
          <br />
          Yet many educational systems still act like AI doesn’t exist—treating
          it as cheating, banning it, or ignoring it entirely.
        </p>
        <p>
          This project gathers anonymous, self-reported data from students
          worldwide and visualizes it through an interactive dashboard. The goal
          isn’t just to inform, it’s to provoke:
        </p>
        <ul>
          <li>What does "Educate" mean in the age of AI?</li>
          <li>
            How do students actually use AI—creatively, strategically, or just
            to survive?
          </li>
          <li>And most importantly: is education stuck in the past?</li>
        </ul>
        <h2>Who made this?</h2>
        <p>
          This is a student-led project developed as part of the Information
          Design course at Aalto University,
          <br />
          in collaboration with Flashka, an AI study platform that creates AI
          tools fro studying not for cheating.
        </p>
        <h2>Why contribute?</h2>
        <p>
          Because this moment matters. The way students interact with AI today
          will define the future of education tomorrow.
          <br />
          Your 3-minute survey response becomes part of an open conversation—and
          a public dataset—for anyone to explore.
        </p>
        <p style={{ marginTop: 18 }}>
          We can’t redesign education without understanding how it’s already
          being hacked.
        </p>
      </div>
    </div>
  );
}
