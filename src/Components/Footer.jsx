import React from "react";
import "../styles/footer.css";
function Footer() {
  return (
    <div className="footer__main">
      <div className="footer__child">
        <p>
          2022 © <b>CyberMod IT</b> | All rights reserved
        </p>
        <div className="pages">
          <span className="primary">Home</span>
          <span className="primary">About</span>
          <span className="primary">Contact</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
