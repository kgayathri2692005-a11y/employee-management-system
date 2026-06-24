import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CompleteProfile.css";

function CompleteProfile() {
const navigate = useNavigate();
const currentUser = localStorage.getItem("email");

const savedProfile =
  JSON.parse(
    localStorage.getItem(`profileData_${currentUser}`)
  ) || {};

const [toast, setToast] = useState("");

const [firstName, setFirstName] = useState(
  savedProfile.firstName || ""
);
const [lastName, setLastName] = useState(
  savedProfile.lastName || ""
);
const [fatherName, setFatherName] = useState(
  savedProfile.fatherName || ""
);
const [motherName, setMotherName] = useState(
    savedProfile.motherName || ""
);
const [gender, setGender] = useState(
  savedProfile.gender || ""
);
const [dob, setDob] = useState(
  savedProfile.dob || ""
);
const [education, setEducation] = useState(
  savedProfile.education || ""
);
const [occupation, setOccupation] = useState(
  savedProfile.occupation || ""
);
const [salary, setSalary] = useState(
  savedProfile.salary || ""
);
const [city, setCity] = useState(
  savedProfile.city || ""
);
const [stateName, setStateName] = useState(
  savedProfile.stateName || ""
);
const [address, setAddress] = useState(
  savedProfile.address || ""
);

const [errors, setErrors] = useState({});

const [extraImages, setExtraImages] = useState(
  savedProfile.extraImages || []
);
const [showImages, setShowImages] = useState(false);

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

const handleExtraImages = (e) => {
const files = Array.from(e.target.files);


const imageUrls = files.map((file) =>
  URL.createObjectURL(file)
);

setExtraImages([...extraImages, ...imageUrls]);


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

if (fatherName.trim().length < 3) {
  newErrors.fatherName =
    "Father Name must contain at least 3 characters";
}

if (motherName.trim().length < 3) {
  newErrors.motherName =
    "Mother Name must contain at least 3 characters";
}

if (!gender) {
  newErrors.gender =
    "Please select Gender";
}

if (!dob) {
  newErrors.dob =
    "Date Of Birth is required";
}

if (education.trim().length < 2) {
  newErrors.education =
    "Education must contain at least 2 characters";
}

if (occupation.trim().length < 2) {
  newErrors.occupation =
    "Occupation must contain at least 2 characters";
}

if (salary && Number(salary) < 0) {
  newErrors.salary =
    "Salary cannot be negative";
}

if (city.trim().length < 3) {
  newErrors.city =
    "City must contain at least 3 characters";
}

if (stateName.trim().length < 3) {
  newErrors.stateName =
    "State must contain at least 3 characters";
}

if (address.trim().length < 10) {
  newErrors.address =
    "Address must contain at least 10 characters";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}
const profileData = {
  firstName,
  lastName,
  fatherName,
  motherName,
  gender,
  dob,
  education,
  occupation,
  salary,
  city,
  stateName,
  address,
  profileImage,
  extraImages,
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

return ( <div className="profile-page">


  {toast && (
    <div className="toast-success">
      {toast}
    </div>
  )}

  <div className="profile-card">

    <h2>Complete Your Profile</h2>

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

        <div className="form-group">
          <label>Father Name *</label>

          <input
            type="text"
            value={fatherName}
            onChange={(e) => {
              setFatherName(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              );

              setErrors({
                ...errors,
                fatherName: "",
              });
            }}
            className={
              errors.fatherName
                ? "input-error"
                : ""
            }
          />

          {errors.fatherName && (
            <p className="error-text">
              {errors.fatherName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Mother Name *</label>

          <input
            type="text"
            value={motherName}
            onChange={(e) => {
              setMotherName(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              );

              setErrors({
                ...errors,
                motherName: "",
              });
            }}
            className={
              errors.motherName
                ? "input-error"
                : ""
            }
          />

          {errors.motherName && (
            <p className="error-text">
              {errors.motherName}
            </p>
          )}
        </div>

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
          <label>Education *</label>

          <input
            type="text"
            value={education}
            onChange={(e) => {
              setEducation(
                e.target.value
              );

              setErrors({
                ...errors,
                education: "",
              });
            }}
            className={
              errors.education
                ? "input-error"
                : ""
            }
          />

          {errors.education && (
            <p className="error-text">
              {errors.education}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Occupation *</label>

          <input
            type="text"
            value={occupation}
            onChange={(e) => {
              setOccupation(
                e.target.value
              );

              setErrors({
                ...errors,
                occupation: "",
              });
            }}
            className={
              errors.occupation
                ? "input-error"
                : ""
            }
          />

          {errors.occupation && (
            <p className="error-text">
              {errors.occupation}
            </p>
          )}
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Salary</label>

          <input
            type="number"
            value={salary}
            onChange={(e) =>
              setSalary(
                e.target.value
              )
            }
            min="0"
          />

          {errors.salary && (
            <p className="error-text">
              {errors.salary}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>City *</label>

          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              );

              setErrors({
                ...errors,
                city: "",
              });
            }}
            className={
              errors.city
                ? "input-error"
                : ""
            }
          />

          {errors.city && (
            <p className="error-text">
              {errors.city}
            </p>
          )}
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label>State *</label>

          <input
            type="text"
            value={stateName}
            onChange={(e) => {
              setStateName(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              );

              setErrors({
                ...errors,
                stateName: "",
              });
            }}
            className={
              errors.stateName
                ? "input-error"
                : ""
            }
          />

          {errors.stateName && (
            <p className="error-text">
              {errors.stateName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Address *</label>

          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(
                e.target.value
              );

              setErrors({
                ...errors,
                address: "",
              });
            }}
            className={
              errors.address
                ? "input-error"
                : ""
            }
          />

          {errors.address && (
            <p className="error-text">
              {errors.address}
            </p>
          )}
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

      <div className="form-group image-upload">

        <label>
          Additional Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={
            handleExtraImages
          }
        />

        {extraImages.length > 0 && (
          <>
            <button
              type="button"
              className="view-images-btn"
              onClick={() =>
                setShowImages(
                  !showImages
                )
              }
            >
              {showImages
                ? "Hide Images"
                : "View Images"}
            </button>

            {showImages && (
              <div className="gallery">

                {extraImages.map(
                  (
                    img,
                    index
                  ) => (
                    <div
                      key={index}
                      className="image-box"
                    >
                      <img
                        src={img}
                        alt="Employee"
                      />

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() =>
                          setExtraImages(
                            extraImages.filter(
                              (
                                _,
                                i
                              ) =>
                                i !==
                                index
                            )
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}

              </div>
            )}
          </>
        )}

      </div>

      <button
        type="submit"
        className="save-btn"
      >
        Save Profile
      </button>

    </form>

  </div>

</div>

);
}

export default CompleteProfile;
