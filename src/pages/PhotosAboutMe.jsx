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
        ABOUT ME
        */

        if (savedProfile.aboutMe) {

            setAboutMe(
                savedProfile.aboutMe
            );

        } else {

            /*
            AUTOMATICALLY GENERATE ABOUT ME
            */

            const name =
                `${savedProfile.firstName || ""} ${
                    savedProfile.lastName || ""
                }`.trim();

            const qualification =
                savedProfile.qualification || "";

            const college =
                savedProfile.college || "";

            const occupation =
                savedProfile.occupation || "";

            const familyType =
                savedProfile.familyType || "";

            const partnerEducation =
                savedProfile.partnerEducation || "";

            const partnerOccupation =
                savedProfile.partnerOccupation || "";


            let generatedText = "";


            if (name) {

                generatedText +=
                    `I am ${name}`;

            }


            if (qualification) {

                generatedText +=
                    `, a ${qualification} graduate`;

            }


            if (college) {

                generatedText +=
                    ` from ${college}`;

            }


            if (occupation) {

                generatedText +=
                    `. I am currently working as a ${occupation}`;

            }


            if (familyType) {

                generatedText +=
                    `. I come from a ${familyType.toLowerCase()} family`;

            }


            if (
                partnerEducation ||
                partnerOccupation
            ) {

                generatedText +=
                    `. I am looking for a partner`;

            }


            if (partnerEducation) {

                generatedText +=
                    ` who is educated`;

            }


            if (partnerOccupation) {

                generatedText +=
                    ` and preferably works as ${partnerOccupation}`;

            }


            generatedText +=
                `. I value simplicity, understanding, respect and family values.`;


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

                    </h3>


                    <p className="photo-info">

                        We created a short introduction using your
                        profile information. You can edit it if you wish.

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