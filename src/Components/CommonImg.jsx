import React from "react";
import "../styles/commonimg.css";
function CommonImg({img}) {
  const img = "cover-img-3.png";
  return (
    <div className="common__img__main">
      <div className="common__img__child">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="common__img__cover__img">
          <img src={`/imgs/${img}`} alt="image not found" />
        </div>
      </div>
    </div>
  );
}

export default CommonImg;
