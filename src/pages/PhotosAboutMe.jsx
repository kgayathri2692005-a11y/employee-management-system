import React, { useEffect, useState } from "react";
import "../styles/CompleteProfile.css";

function PhotosAboutMe({
    onNext,
    onPrevious
}) {

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [additionalPhotos, setAdditionalPhotos] = useState([]);

    const [aboutMe, setAboutMe] = useState("");

    const [errors, setErrors] = useState({});
    const [warningToast, setWarningToast] = useState("");


    /*
    =========================================================
    LOAD EXISTING PROFILE DATA
    =========================================================
    */

    useEffect(() => {

        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            ) || {};

        const allProfiles =
            JSON.parse(
                localStorage.getItem("allProfiles")
            ) || {};

        const currentUser =
            loggedInUser.email;

        const savedProfile =
            allProfiles[currentUser] || {};


        /*
        PROFILE PHOTO
        */

        setProfilePhoto(
            savedProfile.profilePhoto ||
            savedProfile.profileImage ||
            null
        );


        /*
        ADDITIONAL PHOTOS
        */

        setAdditionalPhotos(
            savedProfile.additionalPhotos || []
        );
/*
=========================================================
ABOUT ME - AUTOMATICALLY GENERATE FROM PROFILE DATA
=========================================================
*/

if (savedProfile.aboutMe) {

    // If user already edited/saved About Me,
    // keep their existing text.
    setAboutMe(savedProfile.aboutMe);

} else {

    const sections = [];

    /*
    =====================================================
    PERSONAL + CAREER INTRODUCTION
    =====================================================
    */

    const firstName =
        savedProfile.firstName || "";

    const lastName =
        savedProfile.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim();

    const currentCity =
        savedProfile.currentCity || "";

    const qualification =
        savedProfile.qualification || "";

    const occupation =
        savedProfile.occupation || "";

    const income =
        savedProfile.income || "";


    let introduction = "";


    if (fullName) {

        introduction +=
            `I am ${fullName}`;

    } else {

        introduction +=
            `I am`;

    }


    if (occupation) {

        if (fullName) {

            introduction +=
                `, a ${occupation}`;

        } else {

            introduction +=
                ` a ${occupation}`;

        }

    }


    if (currentCity) {

        introduction +=
            ` based in ${currentCity}`;

    }


    introduction += ".";


    /*
    QUALIFICATION
    */

    if (qualification) {

        introduction +=
            ` I have completed ${qualification}`;

        if (savedProfile.college) {

            introduction +=
                ` from ${savedProfile.college}`;

        }

        introduction += ".";

    }


    /*
    INCOME
    */

    if (income) {

        introduction +=
            ` I currently earn an annual income of ${income}.`;

    }


    /*
    =====================================================
    RELIGION + LOCATION
    =====================================================
    */

    const religion =
        savedProfile.religion || "";

    const motherTongue =
        savedProfile.motherTongue || "";

    const nationality =
        savedProfile.nationality || "";

    const currentState =
        savedProfile.currentState || "";

    const currentCountry =
        savedProfile.currentCountry || "";


    let backgroundText = "";


    if (religion) {

        backgroundText +=
            `I belong to the ${religion} community`;

    }


    if (motherTongue) {

        if (backgroundText) {

            backgroundText +=
                ` and my mother tongue is ${motherTongue}`;

        } else {

            backgroundText +=
                `My mother tongue is ${motherTongue}`;

        }

    }


    if (nationality) {

        if (backgroundText) {

            backgroundText +=
                `. I am ${nationality}`;

        } else {

            backgroundText +=
                `I am ${nationality}`;

        }

    }


    if (currentState && currentCountry) {

        backgroundText +=
            ` based in ${currentState}, ${currentCountry}`;

    } else if (currentState) {

        backgroundText +=
            ` based in ${currentState}`;

    } else if (currentCountry) {

        backgroundText +=
            ` based in ${currentCountry}`;

    }


    if (backgroundText) {

        backgroundText += ".";

        sections.push(
            backgroundText
        );

    }


    /*
    =====================================================
    FAMILY
    =====================================================
    */

    const fatherName =
        savedProfile.fatherName || "";

    const motherName =
        savedProfile.motherName || "";

    const siblings =
        savedProfile.siblings || "";

    const familyType =
        savedProfile.familyType || "";


    let familyText = "";


    if (familyType) {

        familyText +=
            `I come from a ${familyType.toLowerCase()} family.`;

    } else {

        familyText +=
            `I come from a close-knit family.`;

    }


    /*
    Parents - ONLY NAMES
    */

    const familyDetails = [];


    if (fatherName) {

        familyDetails.push(
            `Father: ${fatherName}`
        );

    }


    if (motherName) {

        familyDetails.push(
            `Mother: ${motherName}`
        );

    }


    /*
    SIBLINGS
    */

    if (siblings) {

        familyDetails.push(
            `Siblings: ${siblings}`
        );

    }


    if (familyDetails.length > 0) {

        familyText +=
            ` ${familyDetails.join(" • ")}.`;

    }


    if (
        familyText.trim()
    ) {

        sections.push(
            familyText
        );

    }


    /*
    =====================================================
    LIFESTYLE
    =====================================================
    */

    const foodPreference =
        savedProfile.foodPreference || "";

    const smokingHabit =
        savedProfile.smokingHabit || "";

    const drinkingHabit =
        savedProfile.drinkingHabit || "";

    const hobbies =
        savedProfile.hobbies || "";


    let lifestyleText = "";


    if (foodPreference) {

        lifestyleText +=
            `I follow a ${foodPreference.toLowerCase()} lifestyle`;

    }


    if (smokingHabit) {

        if (lifestyleText) {

            lifestyleText +=
                ` and I ${smokingHabit === "Never"
                    ? "do not smoke"
                    : `smoke ${smokingHabit.toLowerCase()}`
                }`;

        } else {

            lifestyleText +=
                `I ${smokingHabit === "Never"
                    ? "do not smoke"
                    : `smoke ${smokingHabit.toLowerCase()}`
                }`;

        }

    }


    if (drinkingHabit) {

        if (lifestyleText) {

            lifestyleText +=
                ` and ${drinkingHabit === "Never"
                    ? "do not drink"
                    : `drink ${drinkingHabit.toLowerCase()}`
                }`;

        } else {

            lifestyleText +=
                `I ${drinkingHabit === "Never"
                    ? "do not drink"
                    : `drink ${drinkingHabit.toLowerCase()}`
                }`;

        }

    }


    if (lifestyleText) {

        lifestyleText += ".";

        sections.push(
            lifestyleText
        );

    }


    /*
    =====================================================
    HOBBIES
    =====================================================
    */

    if (hobbies.trim()) {

        sections.push(
            `In my free time, I enjoy ${hobbies.trim()}.`
        );

    }


    /*
    =====================================================
    PARTNER PREFERENCE
    =====================================================
    */

    const partnerAgeFrom =
        savedProfile.partnerAgeFrom || "";

    const partnerAgeTo =
        savedProfile.partnerAgeTo || "";

    const partnerReligion =
        savedProfile.partnerReligion || "";

    const partnerEducation =
        savedProfile.partnerEducation || "";

    const partnerOccupation =
        savedProfile.partnerOccupation || "";

    const partnerCountry =
        savedProfile.partnerCountry || "";


    const partnerDetails = [];


    if (partnerEducation) {

        partnerDetails.push(
            partnerEducation
        );

    }


    if (partnerOccupation) {

        partnerDetails.push(
            partnerOccupation
        );

    }


    if (partnerReligion) {

        if (
            partnerReligion !== "Any Religion"
        ) {

            partnerDetails.push(
                `${partnerReligion} background`
            );

        }

    }


    let partnerText = "";


    if (partnerDetails.length > 0) {

        partnerText +=
            `I am looking for a partner who is ${partnerDetails.join(", ")}.`;

    } else {

        partnerText +=
            `I am looking for a caring and understanding partner.`;

    }


    /*
    AGE RANGE
    */

    if (
        partnerAgeFrom &&
        partnerAgeTo
    ) {

        partnerText +=
            ` Preferred age range: ${partnerAgeFrom}–${partnerAgeTo}.`;

    } else if (partnerAgeFrom) {

        partnerText +=
            ` Preferred minimum age: ${partnerAgeFrom}.`;

    } else if (partnerAgeTo) {

        partnerText +=
            ` Preferred maximum age: ${partnerAgeTo}.`;

    }


    /*
    LOCATION
    */

    if (partnerCountry) {

        partnerText +=
            ` Preferred location: ${partnerCountry}.`;

    }


    sections.push(
        partnerText
    );


    /*
    =====================================================
    FINAL ABOUT ME
    =====================================================
    */

    const generatedText =
        [
            introduction,
            ...sections
        ]
        .filter(
            text => text && text.trim()
        )
        .join("\n\n");


    setAboutMe(
        generatedText
    );

}
    }, []);


    /*
    =========================================================
    COMPRESS / RESIZE IMAGE
    =========================================================
    */

    const resizeImage = (file) => {

        return new Promise((resolve) => {

            const reader =
                new FileReader();


            reader.onload = (event) => {

                const img =
                    new Image();


                img.onload = () => {

                    const canvas =
                        document.createElement(
                            "canvas"
                        );


                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;


                    let width =
                        img.width;

                    let height =
                        img.height;


                    /*
                    RESIZE IMAGE
                    */

                    if (
                        width > MAX_WIDTH ||
                        height > MAX_HEIGHT
                    ) {

                        if (
                            width > height
                        ) {

                            height =
                                Math.round(
                                    height *
                                    (MAX_WIDTH /
                                        width)
                                );

                            width =
                                MAX_WIDTH;

                        } else {

                            width =
                                Math.round(
                                    width *
                                    (MAX_HEIGHT /
                                        height)
                                );

                            height =
                                MAX_HEIGHT;

                        }

                    }


                    canvas.width =
                        width;

                    canvas.height =
                        height;


                    const context =
                        canvas.getContext(
                            "2d"
                        );


                    context.drawImage(

                        img,

                        0,
                        0,

                        width,
                        height

                    );


                    const resizedImage =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.8
                        );


                    resolve(
                        resizedImage
                    );

                };


                img.src =
                    event.target.result;

            };


            reader.readAsDataURL(
                file
            );

        });

    };


    /*
    =========================================================
    ADD ADDITIONAL PHOTO
    =========================================================
    */

    const handleAdditionalPhoto = async (e) => {

        const file =
            e.target.files[0];


        if (!file) {
            return;
        }


        /*
        MAXIMUM 4 PHOTOS
        */

        if (
            additionalPhotos.length >= 4
        ) {

            setWarningToast(
                "You can upload a maximum of 4 additional photos."
            );


            setTimeout(() => {

                setWarningToast("");

            }, 3000);


            e.target.value = "";

            return;

        }


        /*
        CHECK IMAGE TYPE
        */

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            setWarningToast(
                "Please select a valid image."
            );


            setTimeout(() => {

                setWarningToast("");

            }, 3000);


            return;

        }


        /*
        RESIZE IMAGE
        */

        const resizedImage =
            await resizeImage(
                file
            );


        setAdditionalPhotos(
            (previousPhotos) => [

                ...previousPhotos,

                resizedImage

            ]
        );


        e.target.value = "";

    };


    /*
    =========================================================
    REMOVE ADDITIONAL PHOTO
    =========================================================
    */

    const removePhoto = (index) => {

        setAdditionalPhotos(
            (previousPhotos) =>

                previousPhotos.filter(
                    (_, photoIndex) =>
                        photoIndex !== index
                )

        );

    };


    /*
    =========================================================
    SAVE DATA
    =========================================================
    */

    const handleNext = () => {

        const newErrors = {};


        /*
        PROFILE PHOTO REQUIRED
        */

        if (!profilePhoto) {

            newErrors.profilePhoto =
                "Please upload a profile photo.";

        }


        /*
        ADDITIONAL PHOTOS ARE OPTIONAL
        */


        setErrors(
            newErrors
        );


        if (
            Object.keys(newErrors).length > 0
        ) {

            setWarningToast(
                "Please complete the required fields before continuing."
            );


            setTimeout(() => {

                setWarningToast("");

            }, 3000);


            return;

        }


        /*
        GET CURRENT USER
        */

        const loggedInUser =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
            ) || {};


        const currentUser =
            loggedInUser.email;


        /*
        GET ALL PROFILES
        */

        const allProfiles =
            JSON.parse(
                localStorage.getItem(
                    "allProfiles"
                )
            ) || {};


        /*
        SAVE PHOTOS + ABOUT ME
        */

        allProfiles[currentUser] = {

            ...allProfiles[currentUser],

            profilePhoto,

            additionalPhotos,

            aboutMe

        };


        /*
        SAVE TO LOCAL STORAGE
        */

        localStorage.setItem(

            "allProfiles",

            JSON.stringify(
                allProfiles
            )

        );


        /*
        MOVE TO VERIFICATION
        */

        if (onNext) {

            onNext();

        }

    };


    return (

        <div className="profile-page">


            {/* WARNING TOAST */}

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

                    Add your photos and tell us about yourself.

                </p>


                <h2>

                    Photos & About Me

                </h2>


                {/* =================================================
                    PROFILE PHOTO
                ================================================= */}

                <div className="photo-section">


                    <h3>

                        Profile Photo

                    </h3>


                    {profilePhoto ? (

                        <div className="main-photo-preview">

                            <img

                                src={profilePhoto}

                                alt="Profile"

                            />

                        </div>

                    ) : (

                        <p>

                            Your profile photo was not uploaded.

                        </p>

                    )}


                </div>


                {/* =================================================
                    ADDITIONAL PHOTOS
                ================================================= */}

                <div className="photo-section">


                    <h3>

                        Additional Photos

                    </h3>


                    <p className="photo-info">

                        You can upload up to 4 additional photos.

                    </p>


                    <div className="additional-photo-grid">


                        {additionalPhotos.map(

                            (photo, index) => (

                                <div

                                    className="additional-photo-item"

                                    key={index}

                                >

                                    <img

                                        src={photo}

                                        alt={`Additional ${index + 1}`}

                                    />


                                    <button

                                        type="button"

                                        className="remove-photo-btn"

                                        onClick={() =>
                                            removePhoto(index)
                                        }

                                    >

                                        ✕

                                    </button>

                                </div>

                            )

                        )}


                        {additionalPhotos.length < 4 && (

                            <label className="add-photo-box">

                                <span>

                                    +

                                </span>

                                <p>

                                    Add Photo

                                </p>


                                <input

                                    type="file"

                                    accept=".jpg,.jpeg,.png"

                                    onChange={
                                        handleAdditionalPhoto
                                    }

                                    hidden

                                />

                            </label>

                        )}

                    </div>


                    <p className="photo-count">

                        {additionalPhotos.length} / 4 photos added

                    </p>


                </div>


                {/* =================================================
                    ABOUT ME
                ================================================= */}

                <div className="about-me-section">


                    <h3>

    About Me

    <span className="optional-label">
        Optional
    </span>

</h3>
<p className="photo-info">

    We've created this introduction using your profile information.
    You can edit it before continuing.

</p>


                    <textarea

                        rows="7"

                        value={aboutMe}

                        onChange={(e) =>
                            setAboutMe(
                                e.target.value
                            )
                        }

                        placeholder="Tell us about yourself..."

                    />


                </div>


                {/* =================================================
                    STEP
                ================================================= */}

                <div className="step-text">

                    Step 6 of 7

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="button-group-between">


                    <button

                        className="previous-btn"

                        type="button"

                        onClick={onPrevious}

                    >

                        ← Previous

                    </button>


                    <button

                        className="next-btn"

                        type="button"

                        onClick={handleNext}

                    >

                        Next →

                    </button>


                </div>


            </div>

        </div>

    );

}


export default PhotosAboutMe;