import React, { useState, useEffect } from "react";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import { db } from "../firebase";
import "../styles/findus.css";
function Findus() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // functions
  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].email.toLowerCase() === obj.email.toLowerCase()) {
        return true;
      }
    }

    return false;
  };
  const getUsersFromDb = async () => {
    const q = query(collection(db, "subscribedUsers"));
    let arr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!containsObject(doc.data(), arr)) {
        arr.push(doc.data());
      }
    });
    setUsers(arr);
  };
  const addUserToDb = async (email) => {
    setLoading(true);
    if (!containsObject({ email }, users)) {
      addDoc(collection(db, "subscribedUsers"), {
        email,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          toast.success("Subscribed successfully", { border: "2px solid red" });
          setLoading(false);
          setEmail("");
          setUsers([...users, { email }]);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setLoading(false);
        });
    } else {
      toast.error("You've Already subscribed");

      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.error("Please Enter the  Email");
    } else {
      if (
        email.toLowerCase().includes("@") &&
        email.toLowerCase().includes(".com")
      ) {
        addUserToDb(email);
      } else {
        toast.error("Please Enter the valid Email");
      }
    }
  };

  useEffect(() => {
    getUsersFromDb();
  }, []);
  return (
    <div className="findus__main">
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
      <div className="findus__child">
        <div className="findus__section">
          <div className="main__heading">
            <h1 className="primary">Find us</h1>
            <div></div>
            <div></div>
          </div>
          <div className="social__icons">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/abdullah-khan-30471a238/"
              className="icons"
            >
              <img src="/imgs/linkedin-logo.svg" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100073596902784"
              className="icons"
            >
              <img src="/imgs/facebook-logo.svg" />
            </a>
            <a
              target="_blank"
              href="https://github.com/Abdullah-Khan-53145"
              className="icons"
            >
              <img src="/imgs/github-logo.png" />
            </a>
          </div>
        </div>
        <form onSubmit={handleClick} className="subcribe">
          <div className="subscribe__child">
            <h1 className="primary">Subscribe</h1>
            <h1 className="secondary__heading primary">To Newsletter</h1>
            <div className="subscribe__input">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
              <button className="primary">
                {loading ? (
                  <div className="lds-circle">
                    <div></div>
                  </div>
                ) : (
                  <div> Subscribe</div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Findus;
