import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Toaster, toast } from "react-hot-toast";
import NotFound from "./NotFound";
import Loading from "./Loading.jsx";
import "../styles/blog.css";
import Article from "./Article";
const Post = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCmt, setLoadingCmt] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cmt, setCmt] = useState("");
  const [cmts, setCmts] = useState([]);

  const addComment = async () => {
    setLoadingCmt(true);
    let commentObj = {
      name,
      comment: cmt,
      email,
    };
    setName("");
    setEmail("");
    setCmt("");
    const docRef = await addDoc(
      collection(db, `blogs/${id}/comments`),
      commentObj
    );
    console.log("Document written with ID: ", docRef.id);
    setLoadingCmt(false);
  };
  const handleComment = (e) => {
    e.preventDefault();
    if (name.length === "") {
      toast.error("Please Enter  Name");
    } else if (email === "") {
      toast.error("Please Enter Email");
    } else if (!email.includes("@") && !email.includes(".come")) {
      toast.error("Please Enter a valid Email");
    } else if (cmt === "") {
      toast.error("Please Enter your comment");
    } else {
      addComment();
    }

    console.log({
      name,
      cmt,
      email,
    });
  };
  const getBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBlog(docSnap.data());
      getRelatedBlogs(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const getRelatedBlogs = async (data) => {
    const q = query(collection(db, "blogs"), where("cat", "==", data.cat));

    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setRelatedBlogs(arr);
    setLoading(false);
  };
  const getComment = () => {
    const q = query(collection(db, `blogs/${id}/comments`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      setCmts(comments);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getComment();
    getBlog();
  }, [id]);
  return (
    <>
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
      {loading ? (
        <NotFound min_height="100vh" message={"Loading.Wait......"} />
      ) : (
        // <Loading min_height="100vh" />
        <div className="blog_main">
          <div className="blog_child">
            <div className="main__blog">
              <div className="blog_main__author__info">
                <div className="blog_author__profile">
                  <img src={blog.userImg} />
                </div>
                <div className="blog_author__info">
                  <span className="primary">{blog.userName}</span>
                  <div className="blog_author__views__date">
                    <span className="secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {blog.views}
                    </span>
                    <span className="secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      {blog.date}
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="primary">{blog.title}</h1>
              <div className="blog__img">
                <img src={blog.coverImg} />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="primary"
              />

              <p className="primary">
                <b>Category: </b> {blog.cat}
              </p>
              <div className="comments">
                <h2>Comments</h2>
                {cmts.length !== 0 ? (
                  cmts.map((cmt, index) => (
                    <div className="comment" key={index}>
                      <span className="primary">
                        <b>{cmt.name}</b>
                      </span>
                      <span className="primary">{cmt.comment}</span>
                    </div>
                  ))
                ) : (
                  <h3>🤐No comments found</h3>
                )}
              </div>
              <form onSubmit={handleComment} className="add__comment">
                <h2>Leave a comment</h2>
                <div className="comment__name">
                  <label htmlFor="name">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(!loadingCmt && e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="comment__email">
                  <label htmlFor="email">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(!loadingCmt && e.target.value)}
                    type="email"
                    name="email"
                    id="name"
                  />
                </div>
                <div className="comment__comment">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    value={cmt}
                    onChange={(e) => setCmt(!loadingCmt && e.target.value)}
                    type="textarea"
                    name="comment"
                    id="name"
                    rows="5"
                  ></textarea>
                </div>
                <button className="primary" type="submit">
                  {loadingCmt ? (
                    <div className="lds-circle">
                      <div></div>
                    </div>
                  ) : (
                    <div> Add Comment</div>
                  )}
                </button>
              </form>
            </div>
            <div className="side__blog__section">
              <h1 className="primary">About author</h1>
              <div className="author__info">
                <div className="author_profile_side">
                  <img src={blog.userImg} />
                </div>
                <p className="primary">
                  <b>{blog.userName}</b>
                </p>
                <p className="primary">{blog.userEmail}</p>
              </div>
              <h1 className="primary">Related Blogs</h1>
              <div className="related__blogs">
                {relatedBlogs.map(
                  (blog, index) => index < 2 && <Article blog={blog} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Post;
