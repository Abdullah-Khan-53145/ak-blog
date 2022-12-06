import React from "react";
import "../styles/findus.css";
function Findus() {
  return (
    <div className="findus__main">
      <div className="findus__child">
        <div className="findus__section">
          <div className="main__heading">
            <h1 className="primary">Find us</h1>
            <div></div>
            <div></div>
          </div>
          <div className="social__icons">
            <div className="icons">
              <img src="/imgs/linkedin-logo.svg" />
            </div>
            <div className="icons">
              <img src="/imgs/google-logo.svg" />
            </div>
            <div className="icons">
              <img src="/imgs/facebook-logo.svg" />
            </div>
          </div>
        </div>
        <div className="subcribe">
          <div className="subscribe__child">
            <h1 className="primary">Subscribe</h1>
            <h1 className="secondary__heading primary">To Newsletter</h1>
            <div className="subscribe__input">
              <input type="text" placeholder="email@example.com" />
              <button className="primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Findus;
