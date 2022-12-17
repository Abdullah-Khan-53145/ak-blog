import React from "react";
import "../styles/header.css";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { logOutAPI, logInAPI } from "./actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Header({ user, logIn, logOut }) {
  const [background, setBackground] = useState(false);
  const [show, setShow] = useState(false);
  const location = useLocation();
  // functions
  const displayHeader = () => {
    if (window.scrollY >= 20) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };
  const addToDb = async (userInfo) => {
    const docRef = await addDoc(collection(db, "users"), userInfo);
    console.log("Document written with ID: ", docRef.id);
  };
  const signIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        logIn(user);
        console.log(user.uid);
        addToDb({
          name: user.displayName,
          id: user.uid,
        });
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
  const handleShow = () => {
    setShow(!show);
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
        <nav className="nav Desktop_elements">
          <ul>
            <Link to="/">
              <li
                style={{
                  textDecoration:
                    location.pathname === "/" ? "underline" : "none",
                }}
              >
                Home
              </li>
            </Link>
            {user && (
              <Link to={`/user/${user?.uid}/`}>
                <li
                  style={{
                    textDecoration:
                      location.pathname === `/user/${user.uid}/`
                        ? "underline"
                        : "none",
                  }}
                >
                  My Blogs
                </li>
              </Link>
            )}
            <Link to="/about">
              <li
                style={{
                  textDecoration:
                    location.pathname === "/about" ? "underline" : "none",
                }}
              >
                About
              </li>
            </Link>
            <Link to="/contact-us">
              <li
                style={{
                  textDecoration:
                    location.pathname === "/contact-us" ? "underline" : "none",
                }}
              >
                Contact
              </li>
            </Link>
            <Link
              to="/write-a-blog"
              className="btn-primary"
              style={{
                backgroundColor:
                  location.pathname === "/write-a-blog" ? "gray" : "black",
              }}
            >
              Write
            </Link>
          </ul>
        </nav>
        <div className="profile__header Desktop_elements">
          <div className="profile_pic">
            <img src={user ? user.photoURL : "/imgs/dummy_profile.JPG"} />
          </div>
          <div className="profile_info">
            <span className="primary">
              Hello,
              {user ? <b>{user.displayName}</b> : <b>Guest</b>}
            </span>
            <span className="header__login secondary" onClick={handleClick}>
              {user ? "Logout" : "Login"}
            </span>
          </div>
        </div>
        <div className="hamburger" onClick={handleShow}>
          <div className="menu-icon">
            <input className="menu-icon__cheeckbox" type="checkbox" />
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="header__main__mob"
        style={{ transform: show ? "translateX(0%)" : "translateX(100%)" }}
      >
        <div className="header__child_mob">
          <nav className="nav_mob">
            <ul>
              <li className="profile__header">
                <div className="profile_pic">
                  <img src={user ? user.photoURL : "/imgs/dummy_profile.JPG"} />
                </div>
                <div className="profile_info">
                  <span className="primary">
                    Hello,
                    {user ? <b>{user.displayName}</b> : <b>Guest</b>}
                  </span>
                  <span
                    className="header__login secondary"
                    onClick={handleClick}
                  >
                    {user ? "Logout" : "Login"}
                  </span>
                </div>
              </li>
              <Link to="/">
                <li
                  style={{
                    textDecoration:
                      location.pathname === "/" ? "underline" : "none",
                  }}
                >
                  Home
                </li>
              </Link>
              {user && (
                <Link to={`/user/${user?.uid}/`}>
                  <li
                    style={{
                      textDecoration:
                        location.pathname === `/user/${user.uid}/`
                          ? "underline"
                          : "none",
                    }}
                  >
                    My Blogs
                  </li>
                </Link>
              )}
              <Link to="/about">
                <li
                  style={{
                    textDecoration:
                      location.pathname === "/about" ? "underline" : "none",
                  }}
                >
                  About
                </li>
              </Link>
              <Link to="/contact-us">
                <li
                  style={{
                    textDecoration:
                      location.pathname === "/contact-us"
                        ? "underline"
                        : "none",
                  }}
                >
                  Contact
                </li>
              </Link>
              <Link
                to="/write-a-blog"
                className="btn-primary"
                style={{
                  backgroundColor:
                    location.pathname === "/write-a-blog" ? "gray" : "black",
                }}
              >
                Write
              </Link>
            </ul>
          </nav>
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
