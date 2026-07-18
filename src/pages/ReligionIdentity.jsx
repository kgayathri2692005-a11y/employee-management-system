import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function ReligionIdentity() {

  const navigate = useNavigate();

  const [religion, setReligion] = React.useState("");
const [caste, setCaste] = React.useState("");
const [motherTongue, setMotherTongue] = React.useState("");
const [nationality, setNationality] = React.useState("");
const [currentCity, setCurrentCity] = React.useState("");
const [currentState, setCurrentState] = React.useState("");
const [currentCountry, setCurrentCountry] = React.useState("");
const [permanentAddress, setPermanentAddress] = React.useState("");
const [permanentCity, setPermanentCity] = React.useState("");
const [permanentState, setPermanentState] = React.useState("");
const [permanentCountry, setPermanentCountry] = React.useState("");

const [errors, setErrors] = React.useState({});
const [warningToast, setWarningToast] = React.useState("");

const handleNext = () => {

  const newErrors = {};

  if (!religion) {
    newErrors.religion = "Please select Religion";
  }

  if (!caste.trim()) {
    newErrors.caste = "Please enter Caste";
  }

  if (!motherTongue.trim()) {
    newErrors.motherTongue = "Please enter Mother Tongue";
  }

  if (!nationality.trim()) {
    newErrors.nationality = "Please enter Nationality";
  }

  if (!currentCity.trim()) {
    newErrors.currentCity = "Please enter Current City";
  }

  if (!currentState.trim()) {
    newErrors.currentState = "Please enter Current State";
  }

  if (!currentCountry.trim()) {
    newErrors.currentCountry = "Please enter Current Country";
  }

  if (!permanentAddress.trim()) {
    newErrors.permanentAddress = "Please enter Permanent Address";
  }

  if (!permanentCity.trim()) {
    newErrors.permanentCity = "Please enter Permanent City";
  }

  if (!permanentState.trim()) {
    newErrors.permanentState = "Please enter Permanent State";
  }

  if (!permanentCountry.trim()) {
    newErrors.permanentCountry = "Please enter Permanent Country";
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

  // Save Religion Page Data
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const currentUser = loggedInUser.email;

  const allProfiles =
    JSON.parse(localStorage.getItem("allProfiles")) || {};

  allProfiles[currentUser] = {
    ...allProfiles[currentUser],

    religion,
    caste,
    motherTongue,
    nationality,
    currentCity,
    currentState,
    currentCountry,
    permanentAddress,
    permanentCity,
    permanentState,
    permanentCountry
  };

  localStorage.setItem(
    "allProfiles",
    JSON.stringify(allProfiles)
  );

  navigate("/complete-profile/education");
};  
return (
    <div className="profile-container">
      {warningToast && (
  <div className="toast-warning">
    {warningToast}
  </div>
)}

      <div className="profile-card">

       <h1 className="profile-title">
                    Complete Your Profile
                </h1>
        <p className="profile-subtitle">
          Please complete your profile to continue.
        </p>

        <h2>Religion & Identity</h2>

      
<div className="form-row"></div>
    <div className="form-group"></div>

          <div>
            <label>Religion *</label>
            <select
  value={religion}
  onChange={(e) => {
    setReligion(e.target.value);

    setErrors({
      ...errors,
      religion: ""
    });
  }}
  className={
    errors.religion ? "input-error" : ""
  }
>
              <option value="">Select</option>
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Jain</option>
            </select>
            {errors.religion && (
  <p className="error-text">
    {errors.religion}
  </p>
)}
          </div>
<div className="form-group">
  <label>Caste *</label>

  <input
    type="text"
    value={caste}
    onChange={(e) => {

      setCaste(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        caste: ""
      });

    }}
    className={errors.caste ? "input-error" : ""}
  />

  {errors.caste && (
    <p className="error-text">
      {errors.caste}
    </p>
  )}
</div>

 <div className="form-row"></div> 
<div className="form-group">
  <label>Mother Tongue *</label>

  <input
    type="text"
    value={motherTongue}
    onChange={(e) => {

      setMotherTongue(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        motherTongue: ""
      });

    }}
    className={errors.motherTongue ? "input-error" : ""}
  />

  {errors.motherTongue && (
    <p className="error-text">
      {errors.motherTongue}
    </p>
  )}
</div>
 
          <div className="form-group">
  <label>Nationality *</label>

  <input
    type="text"
    value={nationality}
    onChange={(e) => {

      setNationality(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        nationality: ""
      });

    }}
    className={errors.nationality ? "input-error" : ""}
  />

  {errors.nationality && (
    <p className="error-text">
      {errors.nationality}
    </p>
  )}
</div>
<div className="form-row"></div>
<div className="form-group">
          
  <label>Current City *</label>

  <input
    type="text"
    value={currentCity}
    onChange={(e) => {

      setCurrentCity(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        currentCity: ""
      });

    }}
    className={errors.currentCity ? "input-error" : ""}
  />

  {errors.currentCity && (
    <p className="error-text">
      {errors.currentCity}
    </p>
  )}
</div>
 
          <div className="form-group">
  <label>Current State *</label>

  <input
    type="text"
    value={currentState}
    onChange={(e) => {

      setCurrentState(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        currentState: ""
      });

    }}
    className={errors.currentState ? "input-error" : ""}
  />

  {errors.currentState && (
    <p className="error-text">
      {errors.currentState}
    </p>
  )}
</div>

 <div className="form-row"></div>        
<div className="form-group">
  <label>Current Country *</label>

  <input
    type="text"
    value={currentCountry}
    onChange={(e) => {

      setCurrentCountry(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        currentCountry: ""
      });

    }}
    className={errors.currentCountry ? "input-error" : ""}
  />

  {errors.currentCountry && (
    <p className="error-text">
      {errors.currentCountry}
    </p>
  )}
</div>
        
<div className="form-group">
  <label>Permanent Address *</label>

  <textarea
    rows="3"
    value={permanentAddress}
    onChange={(e) => {

      setPermanentAddress(e.target.value);

      setErrors({
        ...errors,
        permanentAddress: ""
      });

    }}
    className={errors.permanentAddress ? "input-error" : ""}
  />

  {errors.permanentAddress && (
    <p className="error-text">
      {errors.permanentAddress}
    </p>
  )}
</div>

<div className="form-row"></div>          
<div className="form-group">
  <label>Permanent City *</label>

  <input
    type="text"
    value={permanentCity}
    onChange={(e) => {

      setPermanentCity(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        permanentCity: ""
      });

    }}
    className={errors.permanentCity ? "input-error" : ""}
  />

  {errors.permanentCity && (
    <p className="error-text">
      {errors.permanentCity}
    </p>
  )}
</div>

  
<div className="form-group">
  <label>Permanent State *</label>

  <input
    type="text"
    value={permanentState}
    onChange={(e) => {

      setPermanentState(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        permanentState: ""
      });

    }}
    className={errors.permanentState ? "input-error" : ""}
  />

  {errors.permanentState && (
    <p className="error-text">
      {errors.permanentState}
    </p>
  )}
</div>

 <div className="form-row"></div>         
<div className="form-group">
  <label>Permanent Country *</label>

  <input
    type="text"
    value={permanentCountry}
    onChange={(e) => {

      setPermanentCountry(
        e.target.value.replace(/[^a-zA-Z\s]/g, "")
      );

      setErrors({
        ...errors,
        permanentCountry: ""
      });

    }}
    className={errors.permanentCountry ? "input-error" : ""}
  />

  {errors.permanentCountry && (
    <p className="error-text">
      {errors.permanentCountry}
    </p>
  )}
</div>

        </div>

        <div className="step-text">
          Step 2 of 7
        </div>

        <div className="button-group-between">

          <button
            className="previous-btn"
            onClick={() => navigate("/complete-profile")}
          >
            ← Previous
          </button>

          <button
            className="next-btn"
            onClick={handleNext}
          >
            Next →
          </button>

        </div>

      </div>

  
  );
}

export default ReligionIdentity;