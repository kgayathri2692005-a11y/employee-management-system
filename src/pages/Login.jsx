import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [toast, setToast] =
    useState("");

  const [usernameError, setUsernameError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const handleLogin = (e) => {
e.preventDefault();

setUsernameError("");
setPasswordError("");

const isPhone = /^\d+$/.test(username);

if (isPhone && username.length !== 10) {
setUsernameError(
"Phone Number must contain exactly 10 digits"
);
return;
}

if (
!isPhone &&
username.trim().length < 5
) {
setUsernameError(
"Email or Username must contain at least 5 characters"
);
return;
}

if (password.length < 8) {
setPasswordError(
"Password must contain at least 8 characters"
);
return;
}
axios
  .post(
    "https://localhost:7064/api/Auth/login",
    {
      email: username,
      password: password,
    }
  )
  .then((loginResponse) => {

    console.log(
      "LOGIN SUCCESS",
      loginResponse.data
    );
    localStorage.setItem(
  "loggedInUser",
  JSON.stringify(loginResponse.data)
);

    axios
      .post(
        "https://localhost:7064/api/Auth/send-otp",
        {
          email: username,
        }
      )
      .then((otpResponse) => {

        localStorage.setItem(
          "otp",
          otpResponse.data.otp
        );

        localStorage.setItem(
          "email",
          username
        );

        setToast(
          "OTP Sent Successfully"
        );

        setTimeout(() => {
          navigate("/otp");
        }, 1500);

      });

  })
  .catch((error) => {

    console.log(
      "LOGIN ERROR",
      error.response
    );

    setPasswordError(
      "Invalid Email or Password"
    );

  });

};


  return (
    <div className="login-container">

      {toast && (
        <div className="toast-success">
          {toast}
        </div>
      )}

      <div className="login-card">

        <div className="login-header">
          <h1>
            Employee Management System
          </h1>

          <p>
            Welcome back! Please sign in
            to continue
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>
              Email / Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter Email or Phone Number"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              className={
                usernameError
                  ? "input-error"
                  : ""
              }
              required
            />

            {usernameError && (
              <p className="error-text">
                {usernameError}
              </p>
            )}

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={
                  passwordError
                    ? "input-error"
                    : ""
                }
                required
              />

              <span
                className="toggle-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </span>

            </div>

            {passwordError && (
              <p className="error-text">
                {passwordError}
              </p>
            )}

          </div>

          <div className="remember-row">

            <label className="remember-label">

              <input type="checkbox" />

              Remember Me

            </label>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          <div className="login-links">

            <p
              onClick={() =>
                navigate(
                  "/forgot-password"
                )
              }
            >
              Forgot Password?
            </p>

            <p
              onClick={() =>
                navigate("/register")
              }
            >
              Register
            </p>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;