import React from "react";
import styles from "./footer.module.css";
function Footer() {
  return (
    <div className={styles.footer__main}>
      <div className={styles.footer__child}>
        <p>
          2022 © <b>CyberMod IT</b> | All rights reserved
        </p>
        <div className={styles.pages}>
          <span className="primary">Home</span>
          <span className="primary">About</span>
          <span className="primary">Contact</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
