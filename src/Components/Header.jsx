import React from "react";
import Image from "next/image";
import styles from "./header.module.css";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { connect } from "react-redux";
import { logOutAPI, logInAPI } from "./actions/index";

import { useEffect, useState } from "react";
function Header({ user, logIn, logOut }) {
  const [background, setBackground] = useState(false);
  // functions
  const displayHeader = () => {
    if (window.scrollY >= 20) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        logIn(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error" + errorCode + "\n" + errorMessage);
      });
  };
  const handleClick = () => {
    if (user === null) {
      signIn();
    } else {
      logOut();
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // useEffects
  useEffect(() => {
    window.addEventListener("scroll", displayHeader);
    console.log(background);
    console.log(user);
    return () => window.removeEventListener("scroll", displayHeader);
  }, []);

  return (
    <div
      className={`${styles.header__main} ${background ? styles.active : ""}`}
    >
      <div className={styles.header__child}>
        <div className="logo">&lt;l.code/&gt;</div>
        <nav className={styles.nav}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <button className="primary">Write</button>
          </ul>
        </nav>
        <div className={styles.profile__header}>
          <div className="profile_pic">
            <Image
              src={user ? user.photoURL : "/imgs/dummy_profile.JPG"}
              fill
            />
          </div>
          <div className="profile_info">
            <span className="primary">
              Hello,
              {user ? <b>{user.displayName}</b> : <b>Guest</b>}
            </span>
            <span
              className={`${styles.header__login} secondary`}
              onClick={handleClick}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState,
});
const dispatchStateToProps = (dispatch) => ({
  logIn: (payload) => dispatch(logInAPI(payload)),
  logOut: () => dispatch(logOutAPI()),
});

export default connect(mapStateToProps, dispatchStateToProps)(Header);
