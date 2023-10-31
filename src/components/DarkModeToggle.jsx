import React from "react";

export default function DarkMode() {
  return (
    <div className="darkModeButton">
      <span>Light</span>
      <label className="toggleTheme" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className="slider round"></div>
      </label>
      <span>Dark</span>
    </div>
  );
}
