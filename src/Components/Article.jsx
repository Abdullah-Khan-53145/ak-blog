import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/article.css";
function Article({ blog }) {
  useEffect(() => {}, []);
  return (
    <div className="article__home__main">
      <div className="article__img">
        <img src={blog.coverImg} />
      </div>
      <div className="article__info">
        <h2>{blog.title}</h2>

        <div className="article__main__author__info">
          <div className="article__author__profile">
            <img src={blog.userImg} />
          </div>
          <div className="article__author__info">
            <span className="primary">{blog.userName}</span>
            <div className="article__author__views__date">
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
      </div>
      <Link to={`/blog/${blog.id}`} className="btn-secondary">
        Read Article
      </Link>
    </div>
  );
}

export default Article;
