import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  getCountFromServer,
  addDoc,
} from "firebase/firestore";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { db, storage, auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { logInAPI } from "./actions/index";
import CommonImg from "./CommonImg";
import ReactQuill from "react-quill";
import "../styles/writeblog.css";

function WriteABlog({ user, logIn }) {
  const [blogImg, setBlogImg] = useState(false);
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [content, setContent] = useState("");

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
  const resetFlieds = () => {
    setBlogImg("");
    setTitle("");
    setCat("");
    setContent("");
  };

  const handleSubmit = async () => {
    setloading(true);
    const coll = collection(db, "blogs");
    const query_ = query(coll);
    const snapshot = await getCountFromServer(query_);
    const count = snapshot.data().count;
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
            userEmail: user.email,
            index: count + 1,
            coverImg: downloadURL,
            views: 0,
            uid: user.uid,
            date: getDate(),
          });
          resetFlieds();
          toast.success("blog uploaded");
          setloading(false);
        });
      }
    );
  };
  const handleErrors = (e) => {
    e.preventDefault();
    if (!blogImg) {
      toast.error("Please upload the Cover image");
    } else if (title === "") {
      toast.error("Please enter the title");
    } else if (content.split(" ").length < 100) {
      toast.error("Blog must have atleast 100 words");
    } else if (cat === "") {
      toast.error("Select the catagory");
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main">
      <Toaster
        position={"bottom-center"}
        reverseOrder={true}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "white",
            border: "1px solid gray",
            fontFamily: "Jost",
            borderRadius: "0",
            fontSize: "1rem",
            color: "black",
          },
        }}
      />
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
          </div>

          <div className="text__editor">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(e) => {
                setContent(e);
                console.log(content);
              }}
            />
          </div>
        </form>

        <div className="side_img">
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
