import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "./login.scss";

function Login() {
  const [credentials, setcredentials] = useState({
    username: null,
    password: null,
  });
  const { user, Loading, error, dispatch } = useContext(authContext);
  const handleChange = (e) => {
    setcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "loginStart" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "loginSuccess", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "loginFail",
          payload: { message: "You Are Not Admin in ad" },
        });
      }
    } catch (error) {
      dispatch({ type: "loginFail", payload: error.res.data });
    }
  };
  console.log(user, "new user");
  return (
    <div className="login">
      <div className="lContainer ">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="username"
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="enter password"
              onChange={handleChange}
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button onClick={handleClick} type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
