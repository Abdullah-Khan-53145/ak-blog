import React from "react";
import "../styles/loading.css";
function Loading({ min_height }) {
  return (
    <div className="loading__main" style={{ minHeight: min_height }}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
