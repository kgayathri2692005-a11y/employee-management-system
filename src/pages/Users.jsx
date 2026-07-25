import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/Users.css";
import "../styles/Dashboard.css";

function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);

  /*
  =========================================================
  LOAD USERS / PROFILES
  =========================================================
  */

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const allProfiles =
      JSON.parse(localStorage.getItem("allProfiles")) || {};

    /*
    =========================================================
    CHECK LOGGED-IN USER
    =========================================================
    */

    if (!loggedInUser.email) {
      return;
    }

    /*
    =========================================================
    CURRENT USER PROFILE
    =========================================================
    */

    const currentUserProfile =
      allProfiles[loggedInUser.email] || {};

    const currentUserGender =
      currentUserProfile.gender;

    console.log(
      "Logged In User:",
      loggedInUser
    );

    console.log(
      "Current User Profile:",
      currentUserProfile
    );

    console.log(
      "All Profiles:",
      allProfiles
    );

    /*
    =========================================================
    FILTER AND CREATE USER LIST
    =========================================================
    */

    const users = Object.entries(allProfiles)

      .filter(([email, profile]) => {

        /*
        -----------------------------------------
        DO NOT SHOW LOGGED-IN USER
        -----------------------------------------
        */

        if (
          email ===
          loggedInUser.email
        ) {
          return false;
        }

        /*
        -----------------------------------------
        MALE USER SEES FEMALE PROFILES
        -----------------------------------------
        */

        if (
          currentUserGender ===
          "Male"
        ) {
          return (
            profile.gender ===
            "Female"
          );
        }

        /*
        -----------------------------------------
        FEMALE USER SEES MALE PROFILES
        -----------------------------------------
        */

        if (
          currentUserGender ===
          "Female"
        ) {
          return (
            profile.gender ===
            "Male"
          );
        }

        return false;
      })

      /*
      =========================================================
      CREATE USER OBJECT
      =========================================================
      */

      .map(
        ([email, profile]) => {

          console.log(
            "Profile shown in Users:",
            profile
          );

          return {

            /*
            -----------------------------------------
            IMPORTANT
            -----------------------------------------
            */

            id:
              email,

            email:
              email,

            /*
            -----------------------------------------
            NAME
            -----------------------------------------
            */

            name:
              `${profile.firstName || ""} ${
                profile.lastName || ""
              }`.trim() ||

              profile.userName ||

              profile.fullName ||

              "User",

            /*
            -----------------------------------------
            BASIC DISPLAY
            -----------------------------------------
            */

            designation:
              profile.occupation ||
              "Occupation not added",

            /*
            -----------------------------------------
            IMAGE
            -----------------------------------------
            */

            image:
              profile.profileImage ||
              profile.profilePhoto ||
              "https://randomuser.me/api/portraits/lego/1.jpg",

            /*
            -----------------------------------------
            BASIC INFORMATION
            -----------------------------------------
            */

            gender:
              profile.gender ||
              "",

            dob:
              profile.dob ||
              "",

            maritalStatus:
              profile.maritalStatus ||
              "",

            height:
              profile.height ||
              "",

            weight:
              profile.weight ||
              "",

            religion:
              profile.religion ||
              "",

            caste:
              profile.caste ||
              "",

            motherTongue:
              profile.motherTongue ||
              "",

            nationality:
              profile.nationality ||
              "",

            /*
            -----------------------------------------
            EDUCATION & CAREER
            -----------------------------------------
            */

            qualification:
              profile.qualification ||
              profile.education ||
              "",

            college:
              profile.college ||
              "",

            occupation:
              profile.occupation ||
              "",

            company:
              profile.company ||
              "",

            income:
              profile.income ||
              profile.salary ||
              "",

            workLocation:
              profile.workLocation ||
              "",

            /*
            -----------------------------------------
            LOCATION
            -----------------------------------------
            */

            city:
              profile.currentCity ||
              profile.city ||
              "",

            stateName:
              profile.currentState ||
              profile.stateName ||
              profile.state ||
              "",

            country:
              profile.currentCountry ||
              profile.country ||
              "",

            address:
              profile.currentAddress ||
              profile.address ||
              "",

            /*
            -----------------------------------------
            FAMILY & LIFESTYLE
            -----------------------------------------
            */

            familyType:
              profile.familyType ||
              "",

            foodPreference:
              profile.foodPreference ||
              "",

            smokingHabit:
              profile.smokingHabit ||
              "",

            drinkingHabit:
              profile.drinkingHabit ||
              "",

            hobbies:
              profile.hobbies ||
              "",

            /*
            -----------------------------------------
            PARTNER PREFERENCE
            -----------------------------------------
            */

            partnerAgeFrom:
              profile.partnerAgeFrom ||
              "",

            partnerAgeTo:
              profile.partnerAgeTo ||
              "",

            partnerEducation:
              profile.partnerEducation ||
              "",

            partnerOccupation:
              profile.partnerOccupation ||
              "",

            partnerReligion:
              profile.partnerReligion ||
              "",

            partnerCountry:
              profile.partnerCountry ||
              "",

            /*
            -----------------------------------------
            FAMILY DETAILS
            -----------------------------------------
            */

            fatherName:
              profile.fatherName ||
              "",

            motherName:
              profile.motherName ||
              "",

            siblings:
              profile.siblings ||
              "",

            /*
            -----------------------------------------
            ABOUT ME
            -----------------------------------------
            */

            aboutMe:
              profile.aboutMe ||
              ""
          };
        }
      );

    /*
    =========================================================
    SAVE USERS TO STATE
    =========================================================
    */

    setEmployees(users);

  }, []);


  /*
  =========================================================
  SEARCH FILTER
  =========================================================
  */

  const filteredEmployees =
    employees.filter(
      (employee) => {

        const searchText =
          search.toLowerCase();

        return (

          employee.name
            .toLowerCase()
            .includes(
              searchText
            ) ||

          employee.designation
            .toLowerCase()
            .includes(
              searchText
            ) ||

          employee.city
            .toLowerCase()
            .includes(
              searchText
            )

        );

      }
    );


  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="users-container">

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="search-section">

            <input
              type="text"
              placeholder="Search profiles..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          {/* =================================================
              USER LIST
          ================================================= */}

          {filteredEmployees.length > 0 ? (

            filteredEmployees.map(
              (employee) => (

                <div
                  className="employee-card"
                  key={employee.id}
                >

                  {/* =================================================
                      PROFILE IMAGE
                  ================================================= */}

                  <img
                    src={
                      employee.image
                    }
                    alt={
                      employee.name
                    }
                  />


                  {/* =================================================
                      PROFILE INFORMATION
                  ================================================= */}

                  <div className="employee-info">

                    <h3>
                      {
                        employee.name
                      }
                    </h3>

                    <p>
                      {
                        employee.designation
                      }
                    </p>

                    <p>

                      {
                        employee.city ||
                        "Location not added"
                      }

                      {
                        employee.stateName
                          ? `, ${employee.stateName}`
                          : ""
                      }

                    </p>

                  </div>


                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <div className="buttons">

                    {/* =================================================
                        VIEW PROFILE

                        IMPORTANT FIX:

                        Previously:
                        state: employee

                        Now:
                        state: {
                          profile: employee,
                          from: "/Users"
                        }

                        This allows ViewProfile.jsx to correctly
                        identify the selected user's email.
                    ================================================= */}

                    <button
                      onClick={() => {

                        console.log(
                          "Opening Profile:",
                          employee
                        );

                        navigate(
                          "/view-profile",
                          {
                            state: {
                              profile:
                                employee,

                              from:
                                "/Users"
                            }
                          }
                        );

                      }}
                    >

                      👁 View Profile

                    </button>


                    {/* =================================================
                        MESSAGE
                    ================================================= */}

                    <button
                      onClick={() => {

                        navigate(
                          "/inbox",
                          {
                            state: {
                              selectedUser:
                                employee
                            }
                          }
                        );

                      }}
                    >

                      💬 Message

                    </button>

                  </div>

                </div>

              )
            )

          ) : (

            <h3
              style={{
                textAlign:
                  "center",

                marginTop:
                  "30px"
              }}
            >

              No Profiles Found

            </h3>

          )}

        </div>

      </div>

    </div>

  );

}

export default Users;