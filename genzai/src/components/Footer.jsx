import React from "react";
import "../app.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-categories">
        <a href="#" className="footer-link">
          Privacy
        </a>
        <span className="footer-separator">|</span>
        <a href="#" className="footer-link">
          Aalto University
        </a>
        <span className="footer-separator">|</span>
        <a href="#" className="footer-link">
          Flashka OÜ
        </a>
      </div>
      <div className="footer-trademark">
        Generation[AI] &copy; 2025 &mdash; All data from 2025
      </div>
    </footer>
  );
}
