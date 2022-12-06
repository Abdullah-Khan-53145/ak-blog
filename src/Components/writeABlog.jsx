import React, { useState, useRef, useMemo } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "../styles/writeblog.css";
import CommonImg from "./CommonImg";
import JoditEditor from "jodit-react";

function WriteABlog() {
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
      // maxHeight: 300,
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
  const handleChangeImg = (e) => {
    let img = e.target.files[0];
    if (img === "" || img === undefined) {
      return;
    }
    setBlogImg(img);
  };
  const handleCatClick = (ref) => {
    setCat(ref);
  };
  const addToDb = async (blog) => {
    const docRef = await addDoc(collection(db, "blogs"), blog);
    console.log("Document written with ID: ", docRef.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            title,
            cat,
            content,
            img: downloadURL,
          });
          setloading(false);
        });
      }
    );

    console.log({
      title,
      cat,
      content,
      imgName: blogImg.name,
    });
  };
  const handleErrors = () => {
    setError({ status: false, mesg: "" });
    if (!blogImg) {
      setError({ status: true, mesg: "Please upload the Cover image" });
    }
    setTimeout(() => {
      setError({ status: false, mesg: "" });
    }, 2000);
  };

  return (
    <div className="main">
      <div className="child">
        <div></div>

        <form onSubmit={handleSubmit} className="writer_main">
          {/* <div className="lock">
            <div className="message">
              <h2>Need to Sign in before writing...!</h2>
              <button className="primary">Sign in</button>
            </div>
          </div> */}

          <div className="title__parent">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title__input"
              required
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
                className="secondary"
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

export default WriteABlog;
