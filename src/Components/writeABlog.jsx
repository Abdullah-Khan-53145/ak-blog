import React, { useState, useRef, useMemo } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { connect } from "react-redux";
import { db, storage, auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { logInAPI } from "./actions/index";
import CommonImg from "./CommonImg";
import JoditEditor from "jodit-react";
import "../styles/writeblog.css";

function WriteABlog({ user, logIn }) {
  const [blogImg, setBlogImg] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState({ status: false, mesg: "" });
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      sizeLG: 0,
      defaultActionOnPasteFromWord: "insert_clear_html",
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      removeButtons: [
        "align",
        "erasor",
        "hr",
        "source",
        "font",
        "image",
        "brush",
        "fontsize",
        "fullsize",
        "undo",
        "redo",
        "dots",
        "eraser",
        "copyformat",
        "about",
        "preview",
        "print",
        "video",
        "find",
        "file",
        "superscript",
        "subscript",
        "table",
        "indent",
        "outdent",
        "symbols",
        "selectall",
        "paste",
        "cut",
        "copy",
        "spellcheck",
        "lineafter",
      ],
      width: "100%",
      minHeight: 600,
      maxHeight: 600,
      readonly: false,
      placeholder: "Share your story ...",
    }),
    []
  );
  const filters = [
    { name: "Java", id: 111 },
    { name: "C/C++", id: 222 },
    { name: "Python", id: 333 },
    { name: "JavaScript", id: 444 },
    { name: "TypeScript", id: 555 },
    { name: "ReactJS", id: 666 },
    { name: "NodeJS", id: 777 },
    { name: "General", id: 888 },
  ];
  // functions
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
  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today =
      dd +
      " " +
      (mm === 1
        ? "Jan"
        : mm === 2
        ? "Feb"
        : mm === 3
        ? "March"
        : mm === 4
        ? "April"
        : mm === 5
        ? "May"
        : mm === 6
        ? "June"
        : mm === 7
        ? "July"
        : mm === 8
        ? "Aug"
        : mm === 9
        ? "Sep"
        : mm === 10
        ? "Oct"
        : mm === 11
        ? "Nuv"
        : "Dec") +
      ", " +
      yyyy;
    return today;
  };
  const addToDb = async (blog) => {
    const docRef = await addDoc(collection(db, "blogs"), blog);
    console.log("Document written with ID: ", docRef.id);
  };

  // event handlers
  const handleChangeImg = (e) => {
    let img = e.target.files[0];
    if (img === "" || img === undefined) {
      return;
    }
    setBlogImg(img);
  };
  const handleSignIn = () => {
    signIn();
  };
  const handleCatClick = (ref) => {
    setCat(ref);
    console.log(getDate());
  };

  const handleSubmit = () => {
    const storageRef = ref(storage, `images/${blogImg.name}`);
    const metadata = {
      contentType: "image/jpeg image/png image/gif",
    };
    const uploadTask = uploadBytesResumable(storageRef, blogImg, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setloading(true);
      },
      (error) => {
        console.log(error.code);
        setloading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          addToDb({
            userName: user.displayName,
            userImg: user.photoURL,
            title,
            cat,
            content,
            coverImg: downloadURL,
            views: 0,
            date: getDate(),
          });
          setloading(false);
        });
      }
    );

    console.log({
      userName: user.displayName,
      userImg: user.photoURL,
      title,
      cat,
      content,
      coverImg: blogImg.name,
      views: 0,
      date: getDate(),
    });
  };
  const handleErrors = (e) => {
    e.preventDefault();
    setError({ status: false, mesg: "" });
    if (!blogImg) {
      setError({ status: true, mesg: "Please upload the Cover image" });
    } else if (title === "") {
      setError({ status: true, mesg: "Please enter the title" });
    } else if (content.split(" ").length < 30) {
      setError({ status: true, mesg: "Blog must have atleast 30 words" });
    } else if (cat === "") {
      setError({ status: true, mesg: "Select the catagory" });
    } else {
      handleSubmit();
    }
    setTimeout(() => {
      setError({ status: false, mesg: "" });
    }, 3000);
  };

  return (
    <div className="main">
      <div className="child">
        <div></div>

        <form onSubmit={handleErrors} className="writer_main">
          {!user && (
            <div className="lock">
              <div className="message">
                <h2>Need to Sign in before writing...!</h2>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="primary"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          <div className="title__parent">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title__input"
            />
            <button
              disabled={loading}
              className={`primary ${"publish"}`}
              onClick={handleErrors}
              type="submit"
            >
              {loading ? (
                <div className="lds-circle">
                  <div></div>
                </div>
              ) : (
                <div> Publish</div>
              )}
            </button>
          </div>
          <div className="filters">
            {filters.map((filter) => (
              <span
                className="primary"
                key={filter.id}
                style={{
                  color: filter.name === cat ? "black" : "gray",
                  border:
                    filter.name === cat ? "1px solid black" : "1px solid gray",
                }}
                onClick={() => handleCatClick(filter.name)}
              >
                {filter.name}
              </span>
            ))}
          </div>
          <div className="img_upload">
            <label
              className="label"
              style={{ height: blogImg ? "15rem" : "" }}
              htmlFor="Upload"
            >
              <input
                type="file"
                id="Upload"
                className="hidden"
                onChange={handleChangeImg}
                accept="image/png, image/gif, image/jpeg"
                style={{ visibility: "hidden", position: "absolute" }}
                required
              />

              {!blogImg ? (
                <>
                  <>Upload Cover Img</>
                  <br />
                </>
              ) : (
                <>
                  <div className="change_img_main">
                    <div className="change_img">
                      <h2>Change cover picture</h2>
                    </div>
                    <img src={URL.createObjectURL(blogImg)} />
                  </div>
                </>
              )}
            </label>
            {error.status && (
              <span
                className="secondary error"
                style={{ color: "red", width: "100%" }}
              >
                {error.mesg}
              </span>
            )}
          </div>

          <div className="text__editor">
            <JoditEditor
              value={content}
              ref={editor}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {
                console.log(newContent);
              }}
            />
          </div>
        </form>

        <div>
          <CommonImg img="cover-img-2.jpg" />
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
});

export default connect(mapStateToProps, dispatchStateToProps)(WriteABlog);
