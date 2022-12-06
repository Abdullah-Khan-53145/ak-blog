import React, { useState } from "react";
import CommonImg from "./CommonImg";
import { Toaster, toast } from "react-hot-toast";
import "../styles/contactus.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleMessage = (e) => {
    e.preventDefault();
    if (name.length === "") {
      toast.error("Please Enter  Name");
    } else if (email === "") {
      toast.error("Please Enter Email");
    } else if (!email.includes("@") && !email.includes(".come")) {
      toast.error("Please Enter a valid Email");
    } else if (message === "") {
      toast.error("Please Enter your comment");
    } else {
      setName("");
      setEmail("");
      setMessage("");
      toast.success("message sent successfully");
    }
  };
  return (
    <div className="contact__us__main">
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
      <div className="contact__us__child">
        <form className="contact__us_form" onSubmit={handleMessage}>
          <div className="contact_use_child">
            <h1 className="title primary">Send Me Message</h1>
            <div className="name__email">
              <div className="name input__card">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                />
              </div>
              <div className="email input__card">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                />
              </div>
            </div>
            <div className="message input__card">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button type="submit" className="primary">
              Send Message
            </button>
          </div>
        </form>
        <div className="image">
          <CommonImg img="cover-img-1.jpg" />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
