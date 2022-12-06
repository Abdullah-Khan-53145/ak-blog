import React from "react";
import "../styles/notfound.css";
function NotFound({ message, min_height }) {
  return (
    <div className="not__found__main" style={{ minHeight: min_height }}>
      <h2 className="typing">&lt;{message}/&gt;</h2>
    </div>
  );
}

export default NotFound;
