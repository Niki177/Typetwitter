import React, { useState } from "react";
import "./App.css";

function App() {
  const [showFooter, setShowFooter] = useState(true);

  const handleKeyDown = (event) => {
    if (event.key === "h" || event.key === "H") {
      event.preventDefault();
      setShowFooter((prev) => !prev);
    }
  };

  return (
    <div
      className="app"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <header className="header">
        <h1>Typetwitter</h1>
      </header>

      <main className="main">
        <textarea
          placeholder="Write something..."
        />
      </main>

      {showFooter && (
        <footer className="footer">
          <p>Some footer text here...</p>
        </footer>
      )}
    </div>
  );
}

export default App;
