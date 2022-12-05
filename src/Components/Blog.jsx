import React from "react";
import "../styles/blog.css";
import Article from "./Article";
const Blogs = require("./blogs.json");
const Post = () => {
  const dummy = {
    name: "Maximilian Strauss",
    title: "How Algorithms in Elon Musk’s Twitter Will Determine the Truth",
    description:
      "On October 27, 2022, Elon Musk completed the acquisition of Twitter for an enormous amount of $44 billion. With approximately ~240 Million daily active monetizable users (Q2/2022), this would equate to ~$183 per user.What followed after the acquisition can undoubtedly be described as controversial: Three top executives were immediately fired, and a week later, half of the staff was laid off. A paid model to receive a blue verified checkmark was introduced for $8 per month and was subsequently misused. A tweet by a fake account impersonating pharmaceutical company Eli Lilly that stated that they would make insulin tanked the stock and was estimated to cost $14 billion in market capitalization. And this is probably not the last thing we will hear on the way toward the new Twitter.On October 27, 2022, Elon Musk completed the acquisition of Twitter for an enormous amount of $44 billion. With approximately ~240 Million daily active monetizable users (Q2/2022), this would equate to ~$183 per user.What followed after the acquisition can undoubtedly be described as controversial: Three top executives were immediately fired, and a week later, half of the staff was laid off. A paid model to receive a blue verified checkmark was introduced for $8 per month and was subsequently misused. A tweet by a fake account impersonating pharmaceutical company Eli Lilly that stated that they would make insulin tanked the stock and was estimated to cost $14 billion in market capitalization. And this is probably not the last thing we will hear on the way toward the new TwitterOn October 27, 2022, Elon Musk completed the acquisition of Twitter for an enormous amount of $44 billion. With approximately ~240 Million daily active monetizable users (Q2/2022), this would equate to ~$183 per user.What followed after the acquisition can undoubtedly be described as controversial: Three top executives were immediately fired, and a week later, half of the staff was laid off. A paid model to receive a blue verified checkmark was introduced for $8 per month and was subsequently misused. A tweet by a fake account impersonating pharmaceutical company Eli Lilly that stated that they would make insulin tanked the stock and was estimated to cost $14 billion in market capitalization. And this is probably not the last thing we will hear on the way toward the new Twitter",
    date: "25 Nov, 2022",
    views: "111",
    img: "img-1",
  };
  const dummycmts = [
    { name: "Samiullah Khan", comment: "leart alot, Thank you soo much" },
    {
      name: "soniya akhtr",
      comment:
        "well elaborated, not fond a single written tutorial like this , thanks alot sir",
    },
    {
      name: "zahir shah",
      comment:
        "I ve been teaching this at university but not able to make student understand like this, great work sir",
    },
    {
      name: "adeel abid",
      comment: "Was searching for something like this, thanks alot sir",
    },
  ];

  const handleComment = (e) => {
    e.preventDefault();
    console.log("done");
  };
  return (
    <div className="blog_main">
      <div className="blog_child">
        <div className="main__blog">
          <div className="blog_main__author__info">
            <div className="blog_author__profile">
              <img src="/imgs/dummy_profile.JPG" />
            </div>
            <div className="blog_author__info">
              <span className="primary">{dummy.name}</span>
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
                  {dummy.views}
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
                  {dummy.date}
                </span>
              </div>
            </div>
          </div>

          <h1>{dummy.title}</h1>
          <div className="blog__img">
            <img src={`/imgs/${dummy.img}.jpg`} />
          </div>
          <p className="primary">{dummy.description}</p>
          <p className="primary">
            <b>Category: </b> Java
          </p>
          <div className="comments">
            <h2>Comments</h2>
            {dummycmts.map((cmt, index) => (
              <div className="comment">
                <span className="primary">
                  <b>{cmt.name}</b>
                </span>
                <span className="primary">{cmt.comment}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleComment} className="add__comment">
            <h2>Leave a comment</h2>
            <div className="comment__name">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="comment__email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="name" />
            </div>
            <div className="comment__comment">
              <label htmlFor="comment">Comment</label>
              <textarea
                type="textarea"
                name="comment"
                id="name"
                rows="5"
              ></textarea>
            </div>
            <button className="primary" type="submit">
              Add Comment
            </button>
          </form>
        </div>
        <div className="side__blog__section">
          <h1>About author</h1>
          <div className="author__info">
            <div className="author_profile_side">
              <img src="/imgs/dummy_profile.JPG" />
            </div>
            <p className="primary">
              <b>Abdullah Khan</b>
            </p>
            <p className="primary">abdullah.khan53145@gmail.com</p>
          </div>
          <h1>Related Blogs</h1>
          <div className="related__blogs">
            {Blogs.map((blog, index) => index < 2 && <Article blog={blog} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
