import "./App.css";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Blog from "./Components/Blog";
import WriteABlog from "./Components/WriteABlog";
import Footer from "./Components/Footer";
import About from "./Components/About";
import ContactUs from "./Components/ContactUs";
import UserProfile from "./Components/UserProfile";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Home />
        </div>
      ),
    },
    {
      path: "write-a-blog",
      element: (
        <div className="app__main">
          <Header />
          <WriteABlog />
          <Footer />
        </div>
      ),
    },
    {
      path: "about",
      element: (
        <div className="app__main">
          <Header />
          <About />
          <Footer />
        </div>
      ),
    },
    {
      path: "blog/:id",
      element: (
        <div className="app__main">
          <Header />
          <Blog />
          <Footer />
        </div>
      ),
    },
    {
      path: "user/:id",
      element: (
        <div className="app__main">
          <Header />
          <UserProfile />
          <Footer />
        </div>
      ),
    },
    {
      path: "user/:uid/edit-blog/:id",
      element: (
        <div className="app__main">
          <Header />
          <WriteABlog />
          <Footer />
        </div>
      ),
    },
    {
      path: "contact-us",
      element: (
        <div className="app__main">
          <Header />
          <ContactUs />
          <Footer />
        </div>
      ),
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
