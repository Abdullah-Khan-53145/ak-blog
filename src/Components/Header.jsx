import React from "react";
import "../styles/header.css";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { logOutAPI, logInAPI } from "./actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    return () => window.removeEventListener("scroll", displayHeader);
  }, []);

  return (
    <div className={`header__main ${background ? "active" : ""}`}>
      <div className="header__child">
        <Link to="/" className="logo">
          &lt;Ak.code/&gt;
        </Link>
        <nav className="nav">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <button className="primary">Write</button>
          </ul>
        </nav>
        <div className="profile__header">
          <div className="profile_pic">
            <img src={user ? user.photoURL : "/imgs/dummy_profile.JPG"} />
          </div>
          <div className="profile_info">
            <span className="primary">
              Hello,
              {user ? <b>{user.displayName}</b> : <b>Guest</b>}
            </span>
            <span className="header__login secondary" onClick={handleClick}>
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
