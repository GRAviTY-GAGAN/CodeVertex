import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./component/AllRoutes";
import Navbar from "./component/Navbar";
import useVerify from "./Hooks/useVerify";
import { useDispatch, useSelector } from "react-redux";
import { USER_AUTH, USER_LOGOUT } from "./Redux/actionTypes";
// import SpeechToText from "./component/SpeechToText";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const { verified, user, token } = useVerify();
  const auth = useSelector((store) => store.reducer.auth);
  // console.log(verified, user, token);
  const [show, setShow] = useState(false);
  const navItems = ["Home", "Scores", "Logout"];

  if (!auth) navItems[navItems.length - 1] = "Login";

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const dispatch = useDispatch();
  // const store = useSelector((store) => store.reducer);

  useEffect(() => {
    dispatch({ type: USER_AUTH, auth: verified, payload: user, token: token });
  }, [verified]);

  const handleLogout = () => {
    axios
      .get(`${url}/user/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token", "");
        dispatch({ type: USER_LOGOUT });
      })
      .catch((err) => {
        console.log(err.message, "error while logout");
        alert(err.message);
      });
  };

  return (
    <div className="App">
      <Navbar show={show} setShow={setShow} />
      <AllRoutes />
      <div
        className={`flex absolute top-20 overflow-hidden right-0 flex-col transition-all ease-linear duration-500 bg-white shadow-xl  p-2 ${
          show ? "w-[180px]" : "w-[0px] hidden"
        } `}
      >
        {navItems.map((item) => (
          <Link
            key={item}
            className="overflow-hidden w-[100%] cursor-pointer rounded p-2 hover:bg-purple-200"
            to={item == "Logout" ? "" : item == "Login" ? "/" : item}
            onClick={() => {
              if (item == "Logout") {
                handleLogout();
              }
              setShow(!show);
            }}
          >
            <motion.div
              className=" overflow-hidden w-[100%]"
              whileTap={{ translateX: "10px" }}
            >
              {item}
            </motion.div>
          </Link>
        ))}
      </div>
      {/* <SpeechToText /> */}
    </div>
  );
}

export default App;
