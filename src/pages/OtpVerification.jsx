import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEnvelope, FaRedoAlt } from "react-icons/fa";
import axios from "axios";
import "../styles/OtpVerification.css";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    setOtpError("");

    // OTP length validation
    if (otp.length !== 6) {
      setOtpError(
        "OTP must contain exactly 6 digits"
      );
      return;
    }

    // Demo OTP validation
   const savedOtp =
  localStorage.getItem("otp");

if (otp !== savedOtp) {
  setOtpError(
    "Invalid OTP. Please enter the correct OTP"
  );
  return;
}

    // Success Message
    setToast("OTP Verified Successfully");
    localStorage.removeItem("otp");

    setTimeout(() => {

  const loggedInUser =
  JSON.parse(localStorage.getItem("loggedInUser"));

const allProfiles =
  JSON.parse(localStorage.getItem("allProfiles")) || {};

const userProfile =
  allProfiles[loggedInUser.email];

if (userProfile) {
  navigate("/home");
} else {
  navigate("/complete-profile");
}

}, 1500);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

 const handleResendOtp = () => {

  setOtp("");
  setOtpError("");

  const email =
    localStorage.getItem("email");

  axios
    .post(
      "https://localhost:7064/api/Auth/send-otp",
      {
        email: email,
      }
    )
    .then((response) => {

      localStorage.setItem(
        "otp",
        response.data.otp
      );

      setToast(
        "OTP has been resent successfully"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);

    })
    .catch((error) => {

      console.log(error);

      setToast(
        "Failed to resend OTP"
      );

    });
};

  return (
    <div className="otp-container">

      {toast && (
        <div className="toast-success">
          {toast}
        </div>
      )}

      <div className="otp-card">
        <div className="otp-logo">
    <img src="/niyati-logo.jpeg" alt="Niyati Matrimony" />
</div>

        <div className="otp-header">
          <h1>OTP Verification</h1>

          <p>
            Enter the 6-digit verification code
            sent to your registered Email or
            Phone Number
          </p>
        </div>

        <form onSubmit={handleVerify}>

          <div className="input-group">

           <label className="otp-label">
  <FaEnvelope />
    Verification Code
</label>
            <input
              type="text"
              className={`otp-input ${
                otpError ? "input-error" : ""
              }`}
              maxLength={6}
              placeholder="Enter 6 Digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                );
                setOtpError("");
              }}
              required
            />

            {otpError && (
              <p className="error-text">
                {otpError}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="verify-btn"
          >
            Verify OTP
          </button>

          <div className="resend-section">

            <p className="resend-text">
              Didn't receive the code?
            </p>

           <button
  type="button"
  className="resend-btn"
  onClick={handleResendOtp}
>
  <FaRedoAlt />
  Resend OTP
</button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default OtpVerification;