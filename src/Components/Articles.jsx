import React, { useEffect, useState } from "react";
import "../styles/articles.css";
import Article from "./Article";
import Loading from "./Loading";
import { db } from "../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  getCountFromServer,
  orderBy,
} from "firebase/firestore";
import NotFound from "./NotFound";
const coll = collection(db, "blogs");
function Articles() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([1]);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("General");
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

  const getBlogsTotalCount = async (cat) => {
    let query_;
    if (cat !== "General") {
      try {
        query_ = query(coll, where("cat", "==", cat));
      } catch (error) {
        console.log(error);
      }
    } else {
      query_ = query(coll, orderBy("index", "asc"));
    }
    const snapshot = await getCountFromServer(query_);
    let count = Math.ceil(snapshot.data().count / 9);
    if (!count) {
      setPages([1]);
      setBlogs([]);
      setLoading(false);
    } else {
      let pg = [];
      for (let i = 1; i <= count; i++) {
        pg.push(i);
      }
      setPages(pg);
      fetchAllBlogs(query_, "");
    }
  };
  const fetchAllBlogs = async (query_, key) => {
    const q = query_;
    const querySnapshot = await getDocs(q);
    const blogs = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().title.toLowerCase().includes(key.toLowerCase())) {
        blogs.push({ ...doc.data(), id: doc.id });
      }
    });
    setBlogs(blogs);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const query_ = query(coll, orderBy("index", "asc"));
    fetchAllBlogs(query_, search);
  };
  useEffect(() => {
    setLoading(true);
    getBlogsTotalCount(cat);
  }, [cat]);
  useEffect(() => {
    setLoading(true);
    getBlogsTotalCount(cat);
  }, []);
  return (
    <div className="articles__main">
      <div className="articles__child">
        <div className="articles__main__heading">
          <h1 className="primary">Articles</h1>
          <div></div>
          <div></div>
        </div>
        <div className="articles__filters__search">
          <div className="filter__mai">
            <b>
              <span className="primary">Filters</span>
            </b>
            <div className="filters">
              {filters.map((filter) => (
                <span
                  className="tertiary"
                  key={filter.id}
                  onClick={() => setCat(filter.name)}
                  style={{
                    color: filter.name === cat ? "white" : "black",
                    background: filter.name === cat ? "black" : "white",
                  }}
                >
                  {filter.name}
                </span>
              ))}
            </div>
          </div>
          <form onSubmit={handleSearch} className="search__main">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search..."
            />
            <button type="submit">
              <img src="/imgs/icon.svg" alt="" />
            </button>
          </form>
        </div>
        {loading ? (
          <Loading min_height="50vh" />
        ) : blogs.length === 0 ? (
          <NotFound />
        ) : (
          <>
            <div className="articles__grid">
              {blogs.length !== 0 &&
                blogs.map((blog, index) => <Article key={index} blog={blog} />)}
            </div>
          </>
        )}

        <div className="image__pages">
          <button>
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {loading ? (
            <span style={{ fontStyle: "italic", color: "gray" }}>
              Loading ...
            </span>
          ) : (
            pages.map((page, index) => (
              <span className="primary" key={index}>
                {page}
              </span>
            ))
          )}
          <button>
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Articles;
