import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function CompleteProfile() {

const navigate = useNavigate();

const [step, setStep] = useState(1);
const currentUser = localStorage.getItem("email");

const savedProfile =
  JSON.parse(
    localStorage.getItem(`profileData_${currentUser}`)
  ) || {};

const [toast, setToast] = useState("");
const [warningToast, setWarningToast] = useState("");

const [firstName, setFirstName] = useState(
  savedProfile.firstName || ""
);
const [lastName, setLastName] = useState(
  savedProfile.lastName || ""
);

const [gender, setGender] = useState(
  savedProfile.gender || ""
);
const [dob, setDob] = useState(
  savedProfile.dob || ""
);
const [age, setAge] = useState(savedProfile.age || "");

const [mobileNumber, setMobileNumber] = useState(
  savedProfile.mobileNumber || ""
);

const [email, setEmail] = useState(
  savedProfile.email || ""
);

const [maritalStatus, setMaritalStatus] = useState(
  savedProfile.maritalStatus || ""
);

const [height, setHeight] = useState(
  savedProfile.height || ""
);

const [weight, setWeight] = useState(
  savedProfile.weight || ""
);

const [errors, setErrors] = useState({});
const [profileImage, setProfileImage] = useState(
  savedProfile.profileImage || ""
);

const [showProfileImage, setShowProfileImage] = useState(false);
const handleProfileImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
};

const handleSubmit = (e) => {
e.preventDefault();
const newErrors = {};

if (firstName.trim().length < 3) {
  newErrors.firstName =
    "First Name must contain at least 3 characters";
}

if (lastName.trim().length < 2) {
  newErrors.lastName =
    "Last Name must contain at least 2 characters";
}
if (!gender) {
  newErrors.gender =
    "Please select Gender";
}
if (!dob) {
  newErrors.dob =
    "Date Of Birth is required";
}
setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}
const profileData = {
    firstName,
    lastName,
    gender,
    dob,
    age,
    mobileNumber,
    email,
    maritalStatus,
    height,
    weight,
    profileImage
};

const loggedInUser =
  JSON.parse(localStorage.getItem("loggedInUser")) || {};

const currentUser = loggedInUser.email;

const allProfiles =
  JSON.parse(localStorage.getItem("allProfiles")) || {};

allProfiles[currentUser] = profileData;

localStorage.setItem(
  "allProfiles",
  JSON.stringify(allProfiles)
);
localStorage.setItem(
  "allProfiles",
  JSON.stringify(allProfiles)
);

setToast(
  "Profile Completed Successfully"
);

localStorage.setItem(
  "profileCompleted",
  "true"
);

setTimeout(() => {
  window.location.href = "/dashboard";
}, 1500);

setTimeout(() => {
  setToast("");
}, 3000);
};
const handleNext = () => {

  const newErrors = {};

  if (firstName.trim().length < 3) {
    newErrors.firstName =
      "First Name must contain at least 3 characters";
  }

  if (lastName.trim().length < 2) {
    newErrors.lastName =
      "Last Name must contain at least 2 characters";
  }

  if (!gender) {
    newErrors.gender = "Please select Gender";
  }

  if (!dob) {
    newErrors.dob = "Date Of Birth is required";
  }

  if (!age) {
    newErrors.age = "Age is required";
  }

  if (!mobileNumber || mobileNumber.length !== 10) {
    newErrors.mobileNumber =
      "Enter a valid 10-digit mobile number";
  }

  if (!email) {
    newErrors.email = "Email is required";
  }

  if (!maritalStatus) {
    newErrors.maritalStatus =
      "Please select Marital Status";
  }

  if (!height) {
    newErrors.height = "Height is required";
  }

  if (!weight) {
    newErrors.weight = "Weight is required";
  }

  if (!profileImage) {
    newErrors.profileImage =
      "Please upload a profile picture";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {

    setWarningToast(
      "Please complete all required fields before continuing."
    );

    setTimeout(() => {
      setWarningToast("");
    }, 3000);

    return;
  }

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const currentUser = loggedInUser.email;

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  allProfiles[currentUser] = {
    firstName,
    lastName,
    gender,
    dob,
    age,
    mobileNumber,
    email,
    maritalStatus,
    height,
    weight,
    profileImage
  };

  localStorage.setItem(
    "allProfiles",
    JSON.stringify(allProfiles)
  );

  navigate("/complete-profile/religion");
};
return ( <div className="profile-page">


  {toast && (
    <div className="toast-success">
      {toast}
    </div>
  )}

  {warningToast && (
  <div className="toast-warning">
    {warningToast}
  </div>
)}

  <div className="profile-card">

    <h1 className="profile-title">
    Complete Matrimony Profile
</h1>

<p className="profile-subtitle">
    Basic Profile
</p>
    <p className="profile-subtitle">
          Please complete your profile to continue.
        </p>

    <form onSubmit={handleSubmit}>

      <div className="form-row">

        <div className="form-group">
          <label>First Name *</label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              );

              setErrors({
                ...errors,
                firstName: "",
              });
            }}
            className={
              errors.firstName
                ? "input-error"
                : ""
            }
          />

          {errors.firstName && (
            <p className="error-text">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Last Name *</label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              );

              setErrors({
                ...errors,
                lastName: "",
              });
            }}
            className={
              errors.lastName
                ? "input-error"
                : ""
            }
          />

          {errors.lastName && (
            <p className="error-text">
              {errors.lastName}
            </p>
          )}
        </div>

      </div>

      <div className="form-row">
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Gender *</label>

          <select
            value={gender}
            onChange={(e) => {
              setGender(
                e.target.value
              );

              setErrors({
                ...errors,
                gender: "",
              });
            }}
            className={
              errors.gender
                ? "input-error"
                : ""
            }
          >
            <option value="">
              Select
            </option>
            <option>
              Male
            </option>
            <option>
              Female
            </option>
            <option>
              Other
            </option>
          </select>

          {errors.gender && (
            <p className="error-text">
              {errors.gender}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Date Of Birth *</label>

          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(
                e.target.value
              );

              setErrors({
                ...errors,
                dob: "",
              });
            }}
            className={
              errors.dob
                ? "input-error"
                : ""
            }
          />

          {errors.dob && (
            <p className="error-text">
              {errors.dob}
            </p>
          )}
        </div>

      </div>
<div className="form-row">

  <div className="form-group">
    <label>Age *</label>

    <input
      type="number"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Mobile Number *</label>

    <input
      type="text"
      maxLength="10"
      value={mobileNumber}
      onChange={(e) =>
        setMobileNumber(
          e.target.value.replace(/[^0-9]/g, "")
        )
      }
    />
  </div>

</div>

<div className="form-row">

  <div className="form-group">
    <label>Email *</label>

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Marital Status *</label>

    <select
      value={maritalStatus}
      onChange={(e) =>
        setMaritalStatus(e.target.value)
      }
    >
      <option value="">Select</option>
      <option>Never Married</option>
      <option>Divorced</option>
      <option>Widowed</option>
    </select>
  </div>

</div>

<div className="form-row">

  <div className="form-group">
  <label>Height (cm) *</label>

  <input
    type="text"
    placeholder="Enter Height"
    value={height}
    maxLength={3}
    onChange={(e) =>
      setHeight(
        e.target.value.replace(/[^0-9]/g, "")
      )
    }
  />
</div>

  <div className="form-group">
    <label>Weight *</label>

    <input
      type="number"
      placeholder="kg"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />
  </div>

</div>
      <div className="form-group">

  <label>
    Profile Picture
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleProfileImage}
    
  />
    {profileImage && (
  <>
    <button
      type="button"
      className="view-images-btn"
      onClick={() =>
        setShowProfileImage(!showProfileImage)
      }
    >
      {showProfileImage
        ? "Hide Profile Picture"
        : "View Profile Picture"}
    </button>

    {showProfileImage && (
      <div className="profile-preview">
        <img
          src={profileImage}
          alt="Profile"
        />
      </div>
    )}
  </>
)}
      </div>

      <h3 style={{ textAlign: "center" }}>
  Step {step} of 7
</h3>
      <div className="button-group">
  <button
    type="button"
    className="next-btn"
    onClick={handleNext}
  >
    Next →
  </button>
</div>

    </form>

  </div>

</div>
);
}
export default CompleteProfile;