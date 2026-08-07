import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Dashboard.css";
import "../styles/Wishlist.css";

function Wishlist() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  /*
  =========================================================
  LOGGED-IN USER
  =========================================================
  */

  const loggedInUser =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || {};

  const loggedInEmail =
    (
      loggedInUser.email ||
      ""
    )
      .trim()
      .toLowerCase();


  /*
  =========================================================
  WISHLIST KEY
  =========================================================
  */

  const wishlistKey =
    `wishlist_${loggedInUser.email}`;


  /*
  =========================================================
  LOAD WISHLIST
  =========================================================
  */

  useEffect(() => {

    /*
    GET SAVED WISHLIST
    */

    const savedWishlist =
      JSON.parse(
        localStorage.getItem(
          wishlistKey
        )
      ) || [];


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
    COMBINE WISHLIST DATA
    WITH FULL PROFILE DATA
    */

    const updatedWishlist =
      savedWishlist.map(
        (wishlistUser) => {

          /*
          NORMALIZE EMAIL
          */

          const wishlistEmail =
            (
              wishlistUser.email ||
              ""
            )
              .trim()
              .toLowerCase();


          /*
          FIND EXACT PROFILE
          */

          const profileEntry =
            Object.entries(
              allProfiles
            ).find(
              ([email]) =>
                email
                  .trim()
                  .toLowerCase() ===
                wishlistEmail
            );


          const profile =
            profileEntry
              ? profileEntry[1]
              : {};


          /*
          RETURN WISHLIST USER
          */

          return {

            /*
            KEEP WISHLIST DATA
            */

            ...wishlistUser,


            /*
            ALWAYS KEEP EXACT EMAIL
            */

            email:
              wishlistUser.email,


            /*
            GET IMAGE FROM FULL PROFILE
            */

           image:
  profile.profilePhoto ||

  profile.profileImage ||

  "https://randomuser.me/api/portraits/lego/1.jpg",

            /*
            GET LATEST NAME
            */

            name:

              `${profile.firstName || ""} ${
                profile.lastName || ""
              }`.trim() ||

              wishlistUser.name ||

              "User",


            /*
            GET LATEST OCCUPATION
            */

            occupation:

              profile.occupation ||

              wishlistUser.occupation ||

              "",


            /*
            GET LATEST CITY
            */

            city:

              profile.currentCity ||

              profile.city ||

              wishlistUser.city ||

              "",


            /*
            GET LATEST STATE
            */

            state:

              profile.currentState ||

              profile.stateName ||

              profile.state ||

              wishlistUser.state ||

              ""

          };

        }
      );


    /*
    SET WISHLIST
    */

    setWishlist(
      updatedWishlist
    );

  }, [
    wishlistKey
  ]);


  /*
  =========================================================
  REMOVE FROM WISHLIST
  =========================================================
  */

  const removeFromWishlist = (
    email
  ) => {

    /*
    REMOVE SELECTED USER
    */

    const updatedWishlist =
      wishlist.filter(
        (user) => {

          return (
            user.email !==
            email
          );

        }
      );


    /*
    SAVE ONLY LIGHTWEIGHT DATA
    */

    const lightweightWishlist =
      updatedWishlist.map(
        (user) => ({

          email:
            user.email,

          name:
            user.name,

          gender:
            user.gender || "",

          occupation:
            user.occupation || "",

          city:
            user.city || "",

          state:
            user.state || ""

        })
      );


    /*
    UPDATE LOCAL STORAGE
    */

    localStorage.setItem(

      wishlistKey,

      JSON.stringify(
        lightweightWishlist
      )

    );


    /*
    UPDATE SCREEN
    */

    setWishlist(
      updatedWishlist
    );

  };


  /*
  =========================================================
  VIEW PROFILE
  =========================================================
  */

  const handleViewProfile = (
    user
  ) => {

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
    NORMALIZE SELECTED USER EMAIL
    */

    const selectedEmail =
      (
        user.email ||
        ""
      )
        .trim()
        .toLowerCase();


    /*
    FIND EXACT PROFILE BY EMAIL
    */

    const profileEntry =
      Object.entries(
        allProfiles
      ).find(
        ([email]) =>
          email
            .trim()
            .toLowerCase() ===
          selectedEmail
      );


    /*
    GET FULL PROFILE
    */

    const selectedProfile =
      profileEntry
        ? profileEntry[1]
        : null;


    /*
    DEBUG LOGS
    */

    console.log(
      "Selected Wishlist User Email:",
      user.email
    );

    console.log(
      "Selected Wishlist Full Profile:",
      selectedProfile
    );


    /*
    PROFILE NOT FOUND
    */

    if (!selectedProfile) {

      console.log(
        "❌ Profile not found:",
        user.email
      );

      return;

    }


    /*
    OPEN EXACT USER PROFILE
    */

    navigate(
      "/view-profile",
      {
        state: {

          /*
          SEND FULL PROFILE
          */

          profile: {

            ...selectedProfile,

            email:
              user.email

          },


          /*
          TELL VIEW PROFILE
          WHERE USER CAME FROM
          */

          from:
            "/wishlist"

        }
      }
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

        <div className="wishlist-container">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="wishlist-heading">

            <h1>
              ⭐ My Wishlist
            </h1>

            <p>
              Profiles you have saved for
              later.
            </p>

          </div>


          {/* =================================================
              EMPTY WISHLIST
          ================================================= */}

          {wishlist.length === 0 ? (

            <div className="empty-wishlist">

              <div className="empty-wishlist-icon">
                ⭐
              </div>

              <h3>
                Your Wishlist is Empty
              </h3>

              <p>
                Add profiles you are interested
                in to see them here.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/users"
                  )
                }
              >
                Browse Profiles
              </button>

            </div>

          ) : (

            /* =================================================
               WISHLIST GRID
            ================================================= */

            <div className="wishlist-grid">

              {wishlist.map(
                (user) => (

                  <div
                    className="wishlist-card"
                    key={
                      user.email
                    }
                  >

                    {/* =================================================
                        PROFILE IMAGE
                    ================================================= */}

                    <div
                      className=
                        "wishlist-image-wrapper"
                    >

                      <img
                        src={
                          user.image
                        }
                        alt={
                          user.name
                        }
                        className=
                          "wishlist-image"
                      />

                    </div>


                    {/* =================================================
                        PROFILE INFORMATION
                    ================================================= */}

                    <div
                      className=
                        "wishlist-info"
                    >

                      <h3>
                        {
                          user.name
                        }
                      </h3>


                      <p
                        className=
                          "wishlist-occupation"
                      >

                        {
                          user.occupation ||
                          "Occupation not added"
                        }

                      </p>


                      <p
                        className=
                          "wishlist-location"
                      >

                        📍{" "}

                        {
                          user.city ||
                          "Location not added"
                        }

                        {
                          user.state
                            ? `, ${user.state}`
                            : ""
                        }

                      </p>

                    </div>


                    {/* =================================================
                        ACTION BUTTONS
                    ================================================= */}

                    <div
                      className=
                        "wishlist-actions"
                    >

                      {/* VIEW PROFILE */}

                      <button
                        className=
                          "wishlist-view-btn"
                        onClick={() =>
                          handleViewProfile(
                            user
                          )
                        }
                      >
                        👁 View Profile
                      </button>


                      {/* REMOVE */}

                      <button
                        className=
                          "remove-wishlist-btn"
                        onClick={() =>
                          removeFromWishlist(
                            user.email
                          )
                        }
                      >
                        🗑 Remove
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

                   )}

          {/* =================================================
              PAGE NAVIGATION
          ================================================= */}

          <PageNavigation
            previous="/tracking"
            next="/inbox"
          />

        </div>

      </div>

    </div>
  );

}

export default Wishlist;