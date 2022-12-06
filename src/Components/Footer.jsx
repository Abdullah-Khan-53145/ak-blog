import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/footer.css";
function Footer() {
  const location = useLocation();
  return (
    <div className="footer__main">
      <div className="footer__child">
        <p>
          2022 © <b>CyberMod IT</b> | All rights reserved
        </p>
        <div className="pages">
          <Link to="/">
            <span
              className="primary"
              style={{
                textDecoration:
                  location.pathname === "/" ? "underline" : "none",
              }}
            >
              Home
            </span>
          </Link>
          <Link to="/about">
            <span
              className="primary"
              style={{
                textDecoration:
                  location.pathname === "/about" ? "underline" : "none",
              }}
            >
              About
            </span>
          </Link>
          <Link to="/contact-us">
            <span
              className="primary"
              style={{
                textDecoration:
                  location.pathname === "/contact-us" ? "underline" : "none",
              }}
            >
              Contact
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
