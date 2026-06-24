import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [contact, setContact] = useState("");
  const [contactError, setContactError] =
    useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();

    setContactError("");

    const isPhone = /^\d+$/.test(contact);

    if (!contact.trim()) {
      setContactError(
        "Email or Phone Number is required"
      );
      return;
    }

    if (isPhone && contact.length !== 10) {
      setContactError(
        "Phone Number must contain exactly 10 digits"
      );
      return;
    }

    if (
      !isPhone &&
      contact.trim().length < 5
    ) {
      setContactError(
        "Email must contain at least 5 characters"
      );
      return;
    }

    setToast("OTP Sent Successfully");

    setTimeout(() => {
      navigate("/otp");
    }, 1500);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  return (
    <div className="forgot-container">

      {toast && (
        <div className="toast-success">
          {toast}
        </div>
      )}

      <div className="forgot-card">

        <div className="forgot-header">

          <h1>Forgot Password</h1>

          <p>
            Enter your registered Email
            Address or Phone Number to
            receive an OTP.
          </p>

        </div>

        <form onSubmit={handleSendOtp}>

          <div className="input-group">

            <label>
              Email / Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter Email or Phone Number"
              value={contact}
              onChange={(e) => {
                setContact(
                  e.target.value
                );
                setContactError("");
              }}
              className={
                contactError
                  ? "input-error"
                  : ""
              }
            />

            {contactError && (
              <p className="error-text">
                {contactError}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="forgot-btn"
          >
            Send OTP
          </button>

          <div
            className="back-login"
            onClick={() => navigate("/")}
          >
            Back to Login
          </div>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;