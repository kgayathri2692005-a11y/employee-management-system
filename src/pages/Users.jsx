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

  /*
  =========================================================
  STATES
  =========================================================
  */

  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);

  const [salaryFilter, setSalaryFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");

  const loggedInUser =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || {};

  const loggedInEmail =
    (
      loggedInUser.email || ""
    )
      .trim()
      .toLowerCase();


  /*
  =========================================================
  MATCHED USERS
  =========================================================
  */

  const [matchedUsers, setMatchedUsers] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem(
            "matchedUsers"
          )
        ) || []
      );

    });


  /*
  =========================================================
  WISHLIST
  =========================================================
  */

  const wishlistKey =
    `wishlist_${loggedInEmail}`;

  const [wishlist, setWishlist] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem(
            `wishlist_${
              (
                JSON.parse(
                  localStorage.getItem(
                    "loggedInUser"
                  )
                ) || {}
              ).email
            }`
          )
        ) || []
      );

    });


  /*
  =========================================================
  IGNORED PROFILES
  =========================================================

  IMPORTANT:

  New structure:

  ignoredProfiles = {

    "userA@email.com": [

      {
        email: "userB@email.com",
        name: "User B",
        ignoredBy: "userA@email.com"
      }

    ]

  }

  We only need the emails for filtering Users.
  =========================================================
  */

  const [ignoredProfiles, setIgnoredProfiles] =
    useState([]);


  /*
  =========================================================
  SENT INTEREST STATUS
  =========================================================
  */

  const [sentInterests, setSentInterests] =
    useState({});


  /*
  =========================================================
  GET CURRENT USER'S IGNORED EMAILS
  =========================================================
  */

  const getIgnoredEmails = (
    currentEmail
  ) => {

    const ignoredData =
      JSON.parse(
        localStorage.getItem(
          "ignoredProfiles"
        )
      ) || {};

    const currentKey =
      Object.keys(
        ignoredData
      ).find(
        (key) =>
          key
            .trim()
            .toLowerCase() ===
          currentEmail
            .trim()
            .toLowerCase()
      );

    if (!currentKey) {
      return [];
    }

    const ignoredList =
      ignoredData[currentKey];

    if (!Array.isArray(ignoredList)) {
      return [];
    }

    return ignoredList
      .map(
        (item) => {

          if (
            typeof item ===
            "string"
          ) {
            return item
              .trim()
              .toLowerCase();
          }

          return (
            item?.email ||
            ""
          )
            .trim()
            .toLowerCase();

        }
      )
      .filter(Boolean);

  };


  /*
  =========================================================
  LOAD USERS
  =========================================================
  */

  useEffect(() => {

    const loadUsers = () => {

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        ) || {};

      const currentEmail =
        (
          currentUser.email ||
          ""
        )
          .trim()
          .toLowerCase();

      const allProfiles =
        JSON.parse(
          localStorage.getItem(
            "allProfiles"
          )
        ) || {};

      if (!currentEmail) {
        return;
      }


      /*
      =====================================================
      CURRENT USER PROFILE
      =====================================================
      */

      const currentUserEntry =
        Object.entries(
          allProfiles
        ).find(
          ([email]) =>
            email
              .trim()
              .toLowerCase() ===
            currentEmail
        );

      const currentUserProfile =
        currentUserEntry
          ? currentUserEntry[1]
          : {};


      const currentUserGender =
        currentUserProfile.gender;


      /*
      =====================================================
      GET IGNORED USERS
      =====================================================
      */

      const currentIgnoredEmails =
        getIgnoredEmails(
          currentEmail
        );


      /*
      SAVE IGNORED STATE
      */

      setIgnoredProfiles(
        currentIgnoredEmails
      );


      /*
      =====================================================
      LOAD ALL USERS
      =====================================================
      */

      const users =
        Object.entries(
          allProfiles
        )

        .filter(
          ([email, profile]) => {

            const normalizedEmail =
              email
                .trim()
                .toLowerCase();


            /*
            ===============================================
            DO NOT SHOW LOGGED-IN USER
            ===============================================
            */

            if (
              normalizedEmail ===
              currentEmail
            ) {

              return false;

            }


            /*
            ===============================================
            DO NOT SHOW IGNORED USERS
            ===============================================

            IMPORTANT:

            We ONLY use ignoredProfiles here.

            rejectedProfiles is NOT used anymore.
            ===============================================
            */

            if (
              currentIgnoredEmails.includes(
                normalizedEmail
              )
            ) {

              return false;

            }


            /*
            ===============================================
            MALE SEES FEMALE
            ===============================================
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
            ===============================================
            FEMALE SEES MALE
            ===============================================
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

          }
        )

        .map(
          ([email, profile]) => {

            return {

              id:
                email,

              email:
                email,

              profileEmail:
                email,


              name:
                `${profile.firstName || ""} ${
                  profile.lastName || ""
                }`.trim() ||

                profile.userName ||

                profile.fullName ||

                "User",


              designation:
                profile.occupation ||

                "Occupation not added",


              image:
                profile.profilePhoto ||

                profile.profileImage ||

                (
                  Array.isArray(
                    profile.additionalPhotos
                  ) &&
                  profile.additionalPhotos.length
                    ? profile.additionalPhotos[0]
                    : ""
                ) ||

                "https://randomuser.me/api/portraits/lego/1.jpg",


              gender:
                profile.gender || "",

              dob:
                profile.dob || "",

              maritalStatus:
                profile.maritalStatus || "",

              height:
                profile.height || "",

              weight:
                profile.weight || "",

              religion:
                profile.religion || "",

              caste:
                profile.caste || "",

              motherTongue:
                profile.motherTongue || "",

              nationality:
                profile.nationality || "",

              qualification:
                profile.qualification ||

                profile.education ||

                "",

              college:
                profile.college || "",

              occupation:
                profile.occupation || "",

              company:
                profile.company || "",

              income:
                profile.income ||

                profile.salary ||

                "",

              workLocation:
                profile.workLocation || "",

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

              familyType:
                profile.familyType || "",

              foodPreference:
                profile.foodPreference || "",

              smokingHabit:
                profile.smokingHabit || "",

              drinkingHabit:
                profile.drinkingHabit || "",

              hobbies:
                profile.hobbies || "",

              partnerAgeFrom:
                profile.partnerAgeFrom || "",

              partnerAgeTo:
                profile.partnerAgeTo || "",

              partnerEducation:
                profile.partnerEducation || "",

              partnerOccupation:
                profile.partnerOccupation || "",

              partnerReligion:
                profile.partnerReligion || "",

              partnerCountry:
                profile.partnerCountry || "",

              fatherName:
                profile.fatherName || "",

              motherName:
                profile.motherName || "",

              siblings:
                profile.siblings || "",

              aboutMe:
                profile.aboutMe || ""

            };

          }
        );


      /*
      =====================================================
      UPDATE USERS
      =====================================================
      */

      setEmployees(
        users
      );


      /*
      =====================================================
      LOAD INTEREST REQUESTS
      =====================================================
      */

      const requests =
        JSON.parse(
          localStorage.getItem(
            "interestRequests"
          )
        ) || [];


      const statuses =
        requests
          .filter(
            (request) =>

              (
                request.from ||
                ""
              )
                .trim()
                .toLowerCase() ===
              currentEmail
          )
          .reduce(
            (acc, request) => {

              const target =
                (
                  request.to ||
                  ""
                )
                  .trim()
                  .toLowerCase();

              acc[target] =
                request.status;

              return acc;

            },
            {}
          );


      setSentInterests(
        statuses
      );


      /*
      =====================================================
      LOAD MATCHES
      =====================================================
      */

      setMatchedUsers(
        JSON.parse(
          localStorage.getItem(
            "matchedUsers"
          )
        ) || []
      );

    };


    /*
    =========================================================
    INITIAL LOAD
    =========================================================
    */

    loadUsers();


    /*
    =========================================================
    LISTEN FOR CHANGES
    =========================================================
    */

    window.addEventListener(
      "profileUpdated",
      loadUsers
    );

    window.addEventListener(
      "notificationsUpdated",
      loadUsers
    );

    window.addEventListener(
      "ignoredProfilesUpdated",
      loadUsers
    );


    /*
    =========================================================
    CLEANUP
    =========================================================
    */

    return () => {

      window.removeEventListener(
        "profileUpdated",
        loadUsers
      );

      window.removeEventListener(
        "notificationsUpdated",
        loadUsers
      );

      window.removeEventListener(
        "ignoredProfilesUpdated",
        loadUsers
      );

    };

  }, [loggedInEmail]);


  /*
  =========================================================
  SEARCH + FILTER
  =========================================================
  */

  const filteredEmployees =
    employees.filter(
      (employee) => {

        const searchText =
          search.toLowerCase();


        const matchesSearch =
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
            );


        const matchesSalary =
          salaryFilter === "" ||

          Number(
            employee.income
          ) >=
          Number(
            salaryFilter
          );


        const matchesPlace =
          placeFilter === "" ||

          employee.city
            .toLowerCase()
            .includes(
              placeFilter.toLowerCase()
            ) ||

          employee.stateName
            .toLowerCase()
            .includes(
              placeFilter.toLowerCase()
            );


        return (
          matchesSearch &&
          matchesSalary &&
          matchesPlace
        );

      }
    );


  /*
  =========================================================
  SEND INTEREST
  =========================================================
  */

  const sendInterest = (
    employee
  ) => {

    const interestRequests =
      JSON.parse(
        localStorage.getItem(
          "interestRequests"
        )
      ) || [];


    const currentEmail =
      loggedInEmail;

    const employeeEmail =
      (
        employee.email ||
        ""
      )
        .trim()
        .toLowerCase();


    /*
    =====================================================
    CHECK IF USER IS CURRENTLY IGNORED
    =====================================================
    */

    const currentIgnored =
      getIgnoredEmails(
        currentEmail
      );


    if (
      currentIgnored.includes(
        employeeEmail
      )
    ) {

      toast.info(
        "This profile is currently ignored. Restore it first."
      );

      return;

    }


    /*
    =====================================================
    CHECK EXISTING REQUEST
    =====================================================
    */

    const existingRequest =
      interestRequests.find(
        (request) => {

          const from =
            (
              request.from ||
              ""
            )
              .trim()
              .toLowerCase();

          const to =
            (
              request.to ||
              ""
            )
              .trim()
              .toLowerCase();

          return (

            (
              from ===
              currentEmail &&

              to ===
              employeeEmail
            ) ||

            (
              from ===
              employeeEmail &&

              to ===
              currentEmail
            )

          );

        }
      );


    if (existingRequest) {

      if (
        (
          existingRequest.from ||
          ""
        )
          .trim()
          .toLowerCase() ===
        currentEmail
      ) {

        if (
          existingRequest.status ===
          "Pending"
        ) {

          toast.info(
            "📨 Interest request already sent!"
          );

        } else if (
          existingRequest.status ===
          "Accepted"
        ) {

          toast.info(
            "💞 You are already matched!"
          );

        } else if (
          existingRequest.status ===
          "Rejected"
        ) {

          /*
          IMPORTANT:

          This does NOT hide the profile.

          User can see restored profile.

          But the old rejected request should
          not automatically be treated as a
          new request.
          */

          toast.info(
            "This previous interest request was rejected. You can view the profile again."
          );

        }

      } else {

        toast.info(
          "This person has already sent you an interest request."
        );

      }

      return;

    }


    /*
    =====================================================
    ADD TO WISHLIST
    =====================================================
    */

    const alreadyExists =
      wishlist.some(
        (item) =>
          (
            item.email ||
            ""
          )
            .trim()
            .toLowerCase() ===
          employeeEmail
      );


    if (!alreadyExists) {

      const updatedWishlist = [

        ...wishlist,

        employee

      ];


      setWishlist(
        updatedWishlist
      );


      localStorage.setItem(
        wishlistKey,

        JSON.stringify(
          updatedWishlist
        )
      );

    }


    /*
    =====================================================
    GET SENDER NAME
    =====================================================
    */

    const allProfiles =
      JSON.parse(
        localStorage.getItem(
          "allProfiles"
        )
      ) || {};


    const senderEntry =
      Object.entries(
        allProfiles
      ).find(
        ([email]) =>
          email
            .trim()
            .toLowerCase() ===
          currentEmail
      );


    const senderProfile =
      senderEntry
        ? senderEntry[1]
        : {};


    const senderName =
      [

        senderProfile.firstName,

        senderProfile.lastName

      ]
        .filter(Boolean)
        .join(" ")
        .trim() ||

      loggedInUser.userName ||

      loggedInUser.name ||

      "User";


    /*
    =====================================================
    CREATE REQUEST
    =====================================================
    */

    const newRequest = {

      id:
        Date.now(),

      from:
        loggedInUser.email,

      fromName:
        senderName,

      to:
        employee.email,

      toName:
        employee.name,

      status:
        "Pending",

      sentOn:
        new Date()
          .toLocaleString(),

      rejectionReason:
        "",

      rejectedOn:
        ""

    };


    interestRequests.push(
      newRequest
    );


    localStorage.setItem(
      "interestRequests",

      JSON.stringify(
        interestRequests
      )
    );


    /*
    =====================================================
    UPDATE BUTTON
    =====================================================
    */

    setSentInterests(
      (previous) => ({

        ...previous,

        [employeeEmail]:
          "Pending"

      })
    );


    /*
    =====================================================
    NOTIFY OTHER COMPONENTS
    =====================================================
    */

    window.dispatchEvent(
      new Event(
        "notificationsUpdated"
      )
    );


    toast.success(
      `❤️ Interest request sent to ${employee.name}`
    );

  };


  /*
  =========================================================
  VIEW PROFILE
  =========================================================
  */

  const viewProfile = (
    employee
  ) => {

    navigate(
      "/view-profile",

      {
        state: {

          profile:
            employee,

          from:
            "/users"

        }
      }
    );

  };


  /*
  =========================================================
  IGNORE PROFILE
  =========================================================
  */

  const ignoreProfile = (
    employee
  ) => {

    const currentEmail =
      loggedInEmail;

    const employeeEmail =
      (
        employee.email ||
        ""
      )
        .trim()
        .toLowerCase();


    /*
    =====================================================
    GET EXISTING IGNORED PROFILES
    =====================================================
    */

    const ignoredData =
      JSON.parse(
        localStorage.getItem(
          "ignoredProfiles"
        )
      ) || {};


    /*
    =====================================================
    FIND CURRENT USER KEY
    =====================================================
    */

    const currentKey =
      Object.keys(
        ignoredData
      ).find(
        (key) =>
          key
            .trim()
            .toLowerCase() ===
          currentEmail
      ) ||
      loggedInUser.email;


    /*
    =====================================================
    GET CURRENT LIST
    =====================================================
    */

    const currentList =
      Array.isArray(
        ignoredData[currentKey]
      )
        ? ignoredData[currentKey]
        : [];


    /*
    =====================================================
    CHECK DUPLICATE
    =====================================================
    */

    const alreadyIgnored =
      currentList.some(
        (item) => {

          const email =
            typeof item ===
            "string"

              ? item

              : item?.email;

          return (
            email ||
            ""
          )
            .trim()
            .toLowerCase() ===
          employeeEmail;

        }
      );


    if (
      alreadyIgnored
    ) {

      toast.info(
        "Profile is already ignored."
      );

      return;

    }


    /*
    =====================================================
    ADD PROFILE TO IGNORED PROFILES
    =====================================================
    */

    const ignoredObject = {

      email:
        employee.email,

      name:
        employee.name,

      ignoredBy:
        loggedInUser.email,

      ignoredOn:
        new Date()
          .toLocaleString(),

      occupation:
        employee.occupation || "",

      city:
        employee.city || "",

      state:
        employee.stateName || ""

    };


    const updatedList = [

      ...currentList,

      ignoredObject

    ];


    ignoredData[
      currentKey
    ] =
      updatedList;


    /*
    =====================================================
    SAVE
    =====================================================
    */

    localStorage.setItem(
      "ignoredProfiles",

      JSON.stringify(
        ignoredData
      )
    );


    /*
    =====================================================
    UPDATE LOCAL STATE
    =====================================================
    */

    setIgnoredProfiles(
      (previous) => [

        ...previous,

        employeeEmail

      ]
    );


    /*
    =====================================================
    REMOVE FROM USERS IMMEDIATELY
    =====================================================
    */

    setEmployees(
      (previous) =>
        previous.filter(
          (user) =>
            (
              user.email ||
              ""
            )
              .trim()
              .toLowerCase() !==
            employeeEmail
        )
    );


    /*
    =====================================================
    NOTIFY OTHER COMPONENTS
    =====================================================
    */

    window.dispatchEvent(
      new Event(
        "ignoredProfilesUpdated"
      )
    );


    window.dispatchEvent(
      new Event(
        "notificationsUpdated"
      )
    );


    toast.info(
      `${employee.name} moved to Ignored Profiles`
    );

  };


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
              SEARCH SECTION
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


            <select
              value={salaryFilter}
              onChange={(e) =>
                setSalaryFilter(
                  e.target.value
                )
              }
            >

              <option value="">
                Any Salary
              </option>

              <option value="300000">
                Above ₹3 LPA
              </option>

              <option value="500000">
                Above ₹5 LPA
              </option>

              <option value="700000">
                Above ₹7 LPA
              </option>

              <option value="1000000">
                Above ₹10 LPA
              </option>

            </select>


            <select
              value={placeFilter}
              onChange={(e) =>
                setPlaceFilter(
                  e.target.value
                )
              }
            >

              <option value="">
                All Places
              </option>

              <option value="Bangalore">
                Bangalore
              </option>

              <option value="Mysore">
                Mysore
              </option>

              <option value="Hyderabad">
                Hyderabad
              </option>

              <option value="Chennai">
                Chennai
              </option>

              <option value="Ballari">
                Ballari
              </option>

              <option value="Hubli">
                Hubli
              </option>

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

          {filteredEmployees.map(
            (employee) => {

              const employeeEmail =
                (
                  employee.email ||
                  ""
                )
                  .trim()
                  .toLowerCase();


              const isMatched =
                matchedUsers.some(
                  (match) => {

                    const user1 =
                      (
                        match.user1 ||
                        ""
                      )
                        .trim()
                        .toLowerCase();

                    const user2 =
                      (
                        match.user2 ||
                        ""
                      )
                        .trim()
                        .toLowerCase();

                    return (

                      (
                        user1 ===
                        loggedInEmail &&

                        user2 ===
                        employeeEmail
                      ) ||

                      (
                        user2 ===
                        loggedInEmail &&

                        user1 ===
                        employeeEmail
                      )

                    );

                  }
                );


              return (

                <div
                  className="employee-card"
                  key={employee.id}
                >

                  {/* IMAGE */}

                  <img
                    src={
                      employee.image
                    }
                    alt={
                      employee.name
                    }
                    onClick={() =>
                      viewProfile(
                        employee
                      )
                    }
                    style={{
                      cursor:
                        "pointer"
                    }}
                  />


                  {/* INFO */}

                  <div
                    className="employee-info"
                  >

                    <h3
                      onClick={() =>
                        viewProfile(
                          employee
                        )
                      }
                      style={{
                        cursor:
                          "pointer",

                        color:
                          "#e91e63"
                      }}
                    >

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


                  {/* BUTTONS */}

                  <div
                    className="buttons"
                  >

                    {/* VIEW PROFILE */}

                    <button
                      onClick={() =>
                        viewProfile(
                          employee
                        )
                      }
                    >
                      👁 View Profile
                    </button>


                    {/* INTEREST */}

                    {isMatched ? (

                      <button
                        className="matched-btn"
                        disabled
                      >
                        💞 Matched
                      </button>

                    ) : sentInterests[
                        employeeEmail
                      ] === "Pending" ? (

                      <button
                        className="interest-sent-btn"
                        disabled
                      >
                        📨 Request Sent
                      </button>

                    ) : sentInterests[
    employeeEmail
  ] === "Ignored" ? (

  <button
    className="interest-rejected-btn"
    disabled
  >
    🚫 Request Ignored
  </button>

                    ) : (

                      <button
                        onClick={() =>
                          sendInterest(
                            employee
                          )
                        }
                      >
                        ❤️ Send Interest
                      </button>

                    )}


                    {/* IGNORE */}

                    <button
                      onClick={() =>
                        ignoreProfile(
                          employee
                        )
                      }
                    >
                      ❌ Ignore
                    </button>


                    {/* MESSAGE */}

                    <button
                      onClick={() => {

                        const matches =
                          JSON.parse(
                            localStorage.getItem(
                              "matchedUsers"
                            )
                          ) || [];


                        const isUserMatched =
                          matches.some(
                            (match) => {

                              const user1 =
                                (
                                  match.user1 ||
                                  ""
                                )
                                  .trim()
                                  .toLowerCase();

                              const user2 =
                                (
                                  match.user2 ||
                                  ""
                                )
                                  .trim()
                                  .toLowerCase();


                              return (

                                (
                                  user1 ===
                                  loggedInEmail &&

                                  user2 ===
                                  employeeEmail
                                ) ||

                                (
                                  user2 ===
                                  loggedInEmail &&

                                  user1 ===
                                  employeeEmail
                                )

                              );

                            }
                          );


                        if (
                          !isUserMatched
                        ) {

                          toast.error(
                            "🔒 You can chat only after your interest request is accepted."
                          );

                          return;

                        }


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

              );

            }
          )}


          {/* =================================================
              NO USERS
          ================================================= */}

          {filteredEmployees.length ===
            0 && (

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