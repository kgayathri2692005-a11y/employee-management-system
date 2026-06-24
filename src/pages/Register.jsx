import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {

  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [fullNameError, setFullNameError] =
    useState("");

  const [contactError, setContactError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [
    confirmPasswordError,
    setConfirmPasswordError,
  ] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

     // ✅ TERMS CHECK (IMPORTANT)
    if (!agreed) {
  setToast("Please accept Terms & Conditions");

  setTimeout(() => {
    setToast("");
  }, 3000);

  return;
}


    setFullNameError("");
    setContactError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!fullName.trim()) {
      setFullNameError(
        "Full Name is required"
      );
      return;
    }

    if (fullName.trim().length < 5) {
      setFullNameError(
        "Full Name must contain at least 5 characters"
      );
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(fullName)) {
      setFullNameError(
        "Full Name should contain only letters"
      );
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setContactError(
        "Please provide Email or Phone Number"
      );
      return;
    }

    if (phone && phone.length !== 10) {
      setContactError(
        "Phone Number must contain exactly 10 digits"
      );
      return;
    }

    if (!password) {
      setPasswordError(
        "Password is required"
      );
      return;
    }

    if (password.length < 8) {
      setPasswordError(
        "Password must contain at least 8 characters"
      );
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(
        "Confirm Password is required"
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Passwords do not match"
      );
      return;
    }

   axios
  .post(
    "https://localhost:7064/api/Auth/register",
    {
      fullName,
      email,
      password,
    }
  )
  .then((response) => {
    const userData = {
  fullName,
  email,
  password,
};

localStorage.setItem(
  "registeredUser",
  JSON.stringify(userData)
);
    setToast("Registration Successful");

    setTimeout(() => {
      navigate("/");
    }, 1500);

    setTimeout(() => {
      setToast("");
    }, 3000);
  })
  .catch((error) => {
  setToast("Registration Failed");

  setTimeout(() => {
    setToast("");
  }, 3000);

  console.log(error);
});
  };

  const termsBoxStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  maxHeight: "80vh",
  display: "flex",
  flexDirection: "column"
};

const termsContent = {
  overflowY: "auto",
  maxHeight: "300px",
  padding: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px"
};


  return (
    <div className="register-container">

      {toast && (
        <div className="toast-success">
          {toast}
        </div>
      )}
<div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>

          <p>
            Register to Employee Management
            System
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>
              Full Name
              <span className="required">
                {" "}*
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                  );

                setFullName(value);
                setFullNameError("");
              }}
              autoComplete="name"
            />

            {fullNameError && (
              <p className="error-text">
                {fullNameError}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setContactError("");
              }}
              autoComplete="email"
            />
          </div>

          <div className="or-text">
            OR
          </div>

          <div className="input-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                );
                setContactError("");
              }}
              autoComplete="tel"
            />

            {contactError && (
              <p className="error-text">
                {contactError}
              </p>
            )}
          </div>

          <p className="helper-text">
            Provide at least one contact
            method
          </p>

          <div className="input-group">
            <label>
              Password
              <span className="required">
                {" "}*
              </span>
            </label>

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );
                  setPasswordError("");
                }}
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

          <div className="input-group">
            <label>
              Confirm Password
              <span className="required">
                {" "}*
              </span>
            </label>

            <div className="password-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(
                    e.target.value
                  );
                  setConfirmPasswordError(
                    ""
                  );
                }}
              />

              <span
                className="toggle-password"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </span>

            </div>

            {confirmPasswordError && (
              <p className="error-text">
                {confirmPasswordError}
              </p>
            )}
          </div>
{/* Terms & Conditions */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px",
    border: "1px solid #dbeafe",
    borderRadius: "12px",
    backgroundColor: "#f8fbff",
    marginBottom: "20px"
  }}
>
  <input
    type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    style={{
      width: "16px",
      height: "16px",
      cursor: "pointer"
    }}
  />

  <span
    style={{
      fontSize: "14px",
      fontFamily: "'Inter', sans-serif",
      color: "#374151"
    }}
  >
    I have read and agree to the
  </span>

  <span
    onClick={() => setShowTerms(true)}
    style={{
      color: "#2563eb",
      textDecoration: "underline",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "'Inter', sans-serif",
      whiteSpace: "nowrap"
    }}
  >
    Terms & Conditions
  </span>
</div>



          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

          <div
            className="login-link"
            onClick={() =>
              navigate("/")
            }
          >
            Already have an account?
            Login
          </div>

        </form>

      </div>


{showTerms && (
  <div style={popupOverlay}>
    <div style={termsBoxStyle}>
     <h2
  style={{
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "20px"
  }}
>
  Terms & Conditions
</h2>
      <div style={termsContent}>
        <p>
         1. Users must be 18 years or older to register on the platform.<br /><br />
          2. All information provided during registeration must be accurate and genuine. Fake profiles are strictly prohibited<br /><br />
          3. Users are responsible for maintaining the condidentiality of  their account credentials.<br /><br />
          4. The platform does not guarantee marriage, compatibility, or successful matches between users.<br /><br />
          5. Users must behave respectfully and must not engage in harassment,abuse,fraud, or inappropriate communication.<br /><br />
          6. Personal information shared on the platform should be used only for matrimonial purposes.<br /><br />
          7. Users should independently verify the identity and background of any prospective match before making personal or financial commitments.<br /><br />
          8. The Platform reserves the right to suspend or terminate accounts that violate these terms.<br /><br />
          9. Users must not upload offensive, illegal, misleading, or copyrighted content without permission.<br /><br />
          10. The Platform is not responsible for any disputes,losses, or damages arising from interactions between users.<br /><br />
          11. Any attempt to misuse, hack, or disrupt the platform is strictly prohibited.<br /><br />
          12. The platform may modify these terms and conditions at any time. Continued use of the service constitutes acceptance of the updated terms.<br /><br />
          13. By registering and using this platform, users agree to abide by all the above terms and conditions.<br/><br/>

        </p>
      </div>

      <button
  style={{
    padding: "12px 24px",
    fontSize: "18px",
    alignSelf: "center"
  }}
  onClick={() => {
    setShowTerms(false);
    setAgreed(true);
  }}
>
  Accept & Continue
</button>

    </div>
  </div>
)}

     </div>
  );
}

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const popupBox = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "500px",
  textAlign: "center"
};
const termsBoxStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  width: "900px",
  maxWidth: "90%",
  height: "650px",
  display: "flex",
  flexDirection: "column"
};

const termsContent = {
  flex: 1,
  overflowY: "auto",
  border: "1px solid #ddd",
  padding: "20px",
  marginBottom: "15px",
  fontSize: "18px",
  lineHeight: "1.8"
};

export default Register;
