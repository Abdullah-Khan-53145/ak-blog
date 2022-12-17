import React, { useEffect, useState } from "react";
import "../styles/userprofile.css";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { connect } from "react-redux";

import { collection, query, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import Article from "./Article";
function UserProfile({ user }) {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    const coll = collection(db, "blogs");
    const query_ = query(coll, where("uid", "==", id));
    const querySnapshot = await getDocs(query_);
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data(), id: doc.id });
    });
    console.log(blogs);
    setBlogs(blogs);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="user__profile__main">
      <div className="user__profile__child">
        <div className="user__info">
          <img src={blogs[0]?.userImg} alt="" />
          <h1>{blogs[0]?.userName}</h1>
          <h2>{blogs[0]?.userEmail}</h2>
        </div>
        <h1 className="title">My Blogs</h1>
        <div className="user_profile_articles">
          {blogs.map((blog, index) => (
            <>
              <div className="per__article">
                <Article key={index} blog={blog} />
                {user?.uid === id && (
                  <div className="per__article__buttons">
                    <Link className="btn-primary">Edit</Link>
                    <Link className="btn-primary">Delete</Link>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState,
});
const dispatchStateToProps = (dispatch) => {};

export default connect(mapStateToProps, dispatchStateToProps)(UserProfile);
