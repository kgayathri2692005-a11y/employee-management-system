import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import BasicInformation from "./BasicInformation";
import ReligionIdentity from "./ReligionIdentity";
import EducationCareer from "./EducationCareer";
import FamilyLifestyle from "./FamilyLifestyle";
import PartnerPreference from "./PartnerPreference";
import Verification from "./Verification";
import PhotosAboutMe from "./PhotosAboutMe";

import "../styles/CompleteProfile.css";

function CompleteProfile() {

    /*
    =========================================================
    CURRENT STEP
    =========================================================

    1 = Basic Information
    2 = Religion & Identity
    3 = Education & Career
    4 = Family & Lifestyle
    5 = Partner Preference
    6 = Verification
    */

    const [searchParams] = useSearchParams();

const editMode =
    searchParams.get("edit") === "true";

const urlStep =
    parseInt(
        searchParams.get("step"),
        10
    );

const [currentStep, setCurrentStep] =
    useState(
        editMode &&
        urlStep >= 1 &&
        urlStep <= 7
            ? urlStep
            : 1
    );


    /*
    =========================================================
    AGE RESTRICTION
    =========================================================

    This will be used by BasicInformation.

    If the user is below 18,
    the profile cannot continue.
    */

    const [ageRestricted, setAgeRestricted] =
        useState(false);


    /*
    =========================================================
    SHOW AGE RESTRICTION POPUP
    =========================================================
    */

    const showAgeRestriction = () => {

        setAgeRestricted(true);

    };


    /*
    =========================================================
    CLOSE AGE RESTRICTION POPUP
    =========================================================
    */

    const closeAgeRestriction = () => {

        setAgeRestricted(false);

    };


    /*
    =========================================================
    GO TO NEXT STEP
    =========================================================
    */

    const goToNextStep = () => {

        setCurrentStep((previousStep) => {

            if (previousStep < 7) {

                return previousStep + 1;

            }

            return previousStep;

        });

    };


    /*
    =========================================================
    GO TO PREVIOUS STEP
    =========================================================
    */

    const goToPreviousStep = () => {

        setCurrentStep((previousStep) => {

            if (previousStep > 1) {

                return previousStep - 1;

            }

            return previousStep;

        });

    };


    /*
    =========================================================
    RENDER CURRENT STEP
    =========================================================
    */

    const renderCurrentStep = () => {

        switch (currentStep) {

            case 1:

                return (

                    <BasicInformation

                        onNext={goToNextStep}

                        onAgeRestricted={
                            showAgeRestriction
                        }

                    />

                );


            case 2:

                return (

                    <ReligionIdentity

                        onNext={goToNextStep}

                        onPrevious={
                            goToPreviousStep
                        }

                    />

                );


            case 3:

                return (

                    <EducationCareer

                        onNext={goToNextStep}

                        onPrevious={
                            goToPreviousStep
                        }

                    />

                );


            case 4:

                return (

                    <FamilyLifestyle

                        onNext={goToNextStep}

                        onPrevious={
                            goToPreviousStep
                        }

                    />

                );


            case 5:

                return (

                    <PartnerPreference

                        onNext={goToNextStep}

                        onPrevious={
                            goToPreviousStep
                        }

                    />

                );

                case 6:

    return (

        <PhotosAboutMe

            onNext={goToNextStep}

            onPrevious={
                goToPreviousStep
            }

        />

    );

            case 7:

                return (

                    <Verification

                        onPrevious={
                            goToPreviousStep
                        }

                    />

                );


            default:

                return (

                    <BasicInformation

                        onNext={goToNextStep}

                        onAgeRestricted={
                            showAgeRestriction
                        }

                    />

                );

        }

    };


    return (

        <div className="profile-page">


            {/* =================================================
                AGE RESTRICTION POPUP
            ================================================= */}

            {ageRestricted && (

                <div className="age-restriction-overlay">

                    <div className="age-restriction-popup">


                        <div className="age-warning-icon">

                            ⚠️

                        </div>


                        <h2>
                            Age Restriction
                        </h2>


                        <p>

                            You must be at least
                            <strong> 18 years old </strong>
                            to create a matrimony profile.

                        </p>


                        <button

                            type="button"

                            className="age-popup-close-btn"

                            onClick={
                                closeAgeRestriction
                            }

                        >

                            OK

                        </button>


                    </div>

                </div>

            )}


            {/* =================================================
                PROFILE PROGRESS
            ================================================= */}

            <div className="profile-progress">

                <div
                    className={
                        currentStep >= 1
                            ? "progress-step active"
                            : "progress-step"
                    }
                >
                    1
                </div>


                <div
                    className={
                        currentStep >= 2
                            ? "progress-line active"
                            : "progress-line"
                    }
                ></div>


                <div
                    className={
                        currentStep >= 2
                            ? "progress-step active"
                            : "progress-step"
                    }
                >
                    2
                </div>


                <div
                    className={
                        currentStep >= 3
                            ? "progress-line active"
                            : "progress-line"
                    }
                ></div>


                <div
                    className={
                        currentStep >= 3
                            ? "progress-step active"
                            : "progress-step"
                    }
                >
                    3
                </div>


                <div
                    className={
                        currentStep >= 4
                            ? "progress-line active"
                            : "progress-line"
                    }
                ></div>


                <div
                    className={
                        currentStep >= 4
                            ? "progress-step active"
                            : "progress-step"
                    }
                >
                    4
                </div>


                <div
                    className={
                        currentStep >= 5
                            ? "progress-line active"
                            : "progress-line"
                    }
                ></div>


                <div
                    className={
                        currentStep >= 5
                            ? "progress-step active"
                            : "progress-step"
                    }
                >
                    5
                </div>


                <div
                    className={
                        currentStep >= 6
                            ? "progress-line active"
                            : "progress-line"
                    }
                ></div>


                <div
                    className={
                        currentStep >= 6
                            ? "progress-step active"
                            : "progress-step"
                    }
                >
                    6
                </div>

                <div
        className={
            currentStep >= 7
                ? "progress-line active"
                : "progress-line"
        }
    ></div>


    {/* STEP 7 - VERIFICATION */}
    <div
        className={
            currentStep >= 7
                ? "progress-step active"
                : "progress-step"
        }
    >
        7
    </div>

            </div>


            {/* =================================================
                CURRENT COMPONENT
            ================================================= */}

            {renderCurrentStep()}


        </div>

    );

}


export default CompleteProfile;