import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";
import { toast } from "react-toastify";

import "../styles/Users.css";
import "../styles/Dashboard.css";

function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);

 const loggedInUser =
  JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const matchedUsers =
  JSON.parse(localStorage.getItem("matchedUsers")) || [];

const wishlistKey = `wishlist_${loggedInUser.email}`;

const [wishlist, setWishlist] = useState(() => {
  return JSON.parse(localStorage.getItem(wishlistKey)) || [];
});

const ignoredKey = `ignored_${loggedInUser.email}`;

const [ignoredProfiles, setIgnoredProfiles] = useState(() => {
    return JSON.parse(localStorage.getItem(ignoredKey)) || [];
});

  const [salaryFilter, setSalaryFilter] = useState("");
const [placeFilter, setPlaceFilter] = useState("");

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

  
         const filteredEmployees = employees.filter((employee) => {

  const searchText = search.toLowerCase();

  const matchesSearch =
    employee.name.toLowerCase().includes(searchText) ||
    employee.designation.toLowerCase().includes(searchText) ||
    employee.city.toLowerCase().includes(searchText);

  const matchesSalary =
    salaryFilter === "" ||
    Number(employee.income) >= Number(salaryFilter);

  const matchesPlace =
    placeFilter === "" ||
    employee.city.toLowerCase().includes(placeFilter.toLowerCase()) ||
    employee.stateName.toLowerCase().includes(placeFilter.toLowerCase());

  return matchesSearch && matchesSalary && matchesPlace;
});


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
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={salaryFilter}
    onChange={(e) => setSalaryFilter(e.target.value)}
  >
    <option value="">Any Salary</option>
    <option value="300000">Above ₹3 LPA</option>
    <option value="500000">Above ₹5 LPA</option>
    <option value="700000">Above ₹7 LPA</option>
    <option value="1000000">Above ₹10 LPA</option>
  </select>

  <select
  value={placeFilter}
  onChange={(e) => setPlaceFilter(e.target.value)}
>
  <option value="">All Places</option>
  <option value="Bangalore">Bangalore</option>
  <option value="Mysore">Mysore</option>
  <option value="Hyderabad">Hyderabad</option>
  <option value="Chennai">Chennai</option>
  <option value="Ballari">Ballari</option>
  <option value="Hubli">Hubli</option>
</select>



<button
  className="clear-filter-btn"
  onClick={() => {
    setSearch("");
    setSalaryFilter("");
    setPlaceFilter("");
  }}
>
  Clear Filters
</button>

</div>


          {/* =================================================
              USER LIST
          ================================================= */}

          {filteredEmployees.length > 0 ? (

          filteredEmployees
  .filter(
    (employee) =>
      !ignoredProfiles.includes(employee.email)
  )
  .map((employee) => {

    const isMatched = matchedUsers.some(
      (match) =>
        (match.user1 === loggedInUser.email &&
          match.user2 === employee.email) ||
        (match.user2 === loggedInUser.email &&
          match.user1 === employee.email)
    );

    return (

                <div
                  className="employee-card"
                  key={employee.id}
                >

                  {/* =================================================
                      PROFILE IMAGE
                  ================================================= */}

                  <img
  src={employee.image}
  alt={employee.name}
  onClick={() =>
    navigate("/view-profile", {
      state: {
        profile: employee,
        from: "/users",
      },
    })
  }
  style={{ cursor: "pointer" }}
/>


                  {/* =================================================
                      PROFILE INFORMATION
                  ================================================= */}

                  <div className="employee-info">

                   <h3
  onClick={() =>
    navigate("/view-profile", {
      state: {
        profile: employee,
        from: "/users",
      },
    })
  }
  style={{
    cursor: "pointer",
    color: "#e91e63",
  }}
>
  {employee.name}
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

                    {isMatched ? (

  <button
    className="matched-btn"
    disabled
  >
    💞 Matched
  </button>

) : (

  <button
    onClick={() => {

      const alreadyExists = wishlist.some(
        (item) => item.email === employee.email
      );

      if (alreadyExists) {
        toast.info("Interest already sent!");
        return;
      }

      const updatedWishlist = [...wishlist, employee];

      setWishlist(updatedWishlist);

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(updatedWishlist)
      );

      const interestRequests =
        JSON.parse(localStorage.getItem("interestRequests")) || [];

      interestRequests.push({
        from: loggedInUser.email,
        fromName: loggedInUser.userName || loggedInUser.name,
        to: employee.email,
        toName: employee.name,
        status: "Pending",
        sentOn: new Date().toLocaleString()
      });

      localStorage.setItem(
        "interestRequests",
        JSON.stringify(interestRequests)
      );

      toast.success("❤️ Interest Sent Successfully!");

    }}
  >
    ❤️ Send Interest
  </button>

)}

<button
  onClick={() => {

    const updatedIgnored = [
      ...ignoredProfiles,
      employee.email
    ];

    setIgnoredProfiles(updatedIgnored);

    localStorage.setItem(
      ignoredKey,
      JSON.stringify(updatedIgnored)
    );

    toast.info("Profile Ignored");

  }}
>
  ❌ Ignore
</button>


                    {/* =================================================
                        MESSAGE
                    ================================================= */}

                    
                       <button
  onClick={() => {

    const matchedUsers =
      JSON.parse(localStorage.getItem("matchedUsers")) || [];

    const isMatched = matchedUsers.some(
      (match) =>
        (match.user1 === loggedInUser.email &&
          match.user2 === employee.email) ||
        (match.user2 === loggedInUser.email &&
          match.user1 === employee.email)
    );

    if (!isMatched) {
      toast.error(
        "🔒 You can chat only after your interest request is accepted."
      );
      return;
    }

    navigate("/inbox", {
      state: {
        selectedUser: employee
      }
    });

  }}
>
  💬 Message
</button>

                  </div>

                </div>

                            );
            })

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

       <PageNavigation
  previous="/dashboard"
  next="/inbox"
/>

        </div>

      </div>

    </div>

  );

}

export default Users;