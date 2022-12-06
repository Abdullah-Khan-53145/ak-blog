import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Articles from "./Articles";
import Findus from "./Findus";
import Footer from "./Footer";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Articles />
      <Findus />
      <Footer />
    </>
  );
}

export default Home;
