import React, { useEffect } from "react";
import CommonImg from "./CommonImg";
import "../styles/about.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about__main">
      <div className="about__child">
        <div className="about_info">
          <h1 className="title primary">About Me</h1>
          <p className="primary">
            I'M <b>ABDULLAH KHAN</b>
            Hardworking Student and Self-Taught Frontend Developer with good
            programming skills.Made amazing, well-optimized and Modern Wedsites.
            Interested to learn new technologies and building solutions for
            problems
          </p>
          <h2 className="secondary">Benefit of Teaching by sharing</h2>
          <p>
            Initially, I built this blog to preserve my experiences of learning
            programming, But then I thought there should be a platform where
            people can preserve there learning and coding experience along with
            all the new tech and tricks that they’ve learnt.
          </p>{" "}
          <br />
          <p>
            Beginners and new developers can get the benefit from the experience
            of advance developers and learn those advance tricks which they may
            master after years of coding in just a moment through reading
            experience of big developers.
          </p>{" "}
          <br />
          <p>
            Another thing is summarizing you work and explaining it in written
            form helps the writer himself to master it and take most out of it.
          </p>{" "}
          <br />
        </div>
        <div className="image">
          <CommonImg img="cover-img-3.png" />
        </div>
      </div>
    </div>
  );
}

export default About;
