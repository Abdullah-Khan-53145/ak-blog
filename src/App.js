import "./App.css";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import WriteABlog from "./Components/WriteABlog";
import Footer from "./Components/Footer";
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
        <>
          <Header />
          <WriteABlog />
          <Footer />
        </>
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
