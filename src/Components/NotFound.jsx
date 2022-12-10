import React from "react";
import Typed from "react-typed";
import "../styles/notfound.css";
function NotFound({ message, min_height }) {
  return (
    <div className="not__found__main" style={{ minHeight: min_height }}>
      <Typed
        strings={
          message
            ? ["&lt;Loading.Please.Wait/&gt;", "return Please_Wait;"]
            : ["&lt;No.Result.Found/&gt;", "return NOT_FOUND;"]
        }
        typeSpeed={100}
        backSpeed={50}
        loop
      />
    </div>
  );
}

export default NotFound;
