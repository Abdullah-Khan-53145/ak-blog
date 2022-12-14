import React, { useEffect, useState } from "react";
import "../styles/userprofile.css";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Article from "./Article";
function UserProfile({ user }) {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const delBlog = async (blogId) => {
    setLoading(true);
    await deleteDoc(doc(db, "blogs", blogId));
    getAllBlogs();
  };
  const getAllBlogs = async () => {
    setLoading(true);
    const coll = collection(db, "blogs");
    const query_ = query(coll, where("uid", "==", id));
    const querySnapshot = await getDocs(query_);
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data(), id: doc.id });
    });
    setBlogs(blogs);
    setLoading(false);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="user__profile__main">
      {loading ? (
        <NotFound message={true} min_height="100vh" />
      ) : (
        <div className="user__profile__child">
          <div className="user__info">
            <img
              src={user?.uid === id ? user.photoURL : blogs[0]?.userImg}
              alt=""
            />
            <h1>{user?.uid === id ? user.displayName : blogs[0]?.userName}</h1>
            <h2>{user?.uid === id ? user.email : blogs[0]?.userEmail}</h2>
          </div>
          <h1 className="title">My Blogs</h1>

          <div className="user_profile_articles">
            {blogs.length !== 0 ? (
              blogs.map((blog, index) => (
                <>
                  <div className="per__article">
                    <Article key={index} blog={blog} />
                    {user?.uid === id && (
                      <div className="per__article__buttons">
                        <Link
                          to={`./edit-blog/${blog.id}`}
                          className="btn-primary"
                        >
                          Edit
                        </Link>
                        <Link
                          onClick={(e) => delBlog(blog.id)}
                          className="btn-primary"
                        >
                          Delete
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              ))
            ) : (
              <h2>No Blogs to show</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState,
});
const dispatchStateToProps = (dispatch) => {};

export default connect(mapStateToProps, dispatchStateToProps)(UserProfile);
