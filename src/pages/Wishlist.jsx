import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PageNavigation from "../components/PageNavigation";

import "../styles/Dashboard.css";
import "../styles/Wishlist.css";

function Wishlist() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] =
    useState([]);

  /*
  =========================================================
  LOGGED-IN USER
  =========================================================
  */

  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    ) || {};

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

  IMPORTANT:

  Wishlist contains only lightweight information.

  Example:

  {
    email,
    name,
    gender,
    occupation,
    city,
    state
  }

  The image is NOT stored in wishlist.

  We get the image from allProfiles.
  =========================================================
  */

  useEffect(() => {

    const savedWishlist =
      JSON.parse(
        localStorage.getItem(
          wishlistKey
        )
      ) || [];

    /*
    Get all profiles.

    This is where the original profile image
    is stored.
    */

    const allProfiles =
      JSON.parse(
        localStorage.getItem(
          "allProfiles"
        )
      ) || {};

    /*
    Combine wishlist data with
    original profile data.
    */

    const updatedWishlist =
      savedWishlist.map(
        (wishlistUser) => {

          const profile =
            allProfiles[
              wishlistUser.email
            ] || {};

          return {

            ...wishlistUser,

            /*
            Get image from allProfiles.

            We are NOT saving this image
            back into wishlist localStorage.
            */

            image:
              profile.profileImage ||

              profile.profilePhoto ||

              "https://randomuser.me/api/portraits/lego/1.jpg",

            /*
            Get latest information
            from profile if available.
            */

            name:
              wishlistUser.name ||

              `${profile.firstName || ""} ${
                profile.lastName || ""
              }`.trim() ||

              "User",

            occupation:
              wishlistUser.occupation ||

              profile.occupation ||

              "",

            city:
              wishlistUser.city ||

              profile.currentCity ||

              profile.city ||

              "",

            state:
              wishlistUser.state ||

              profile.currentState ||

              profile.stateName ||

              profile.state ||

              ""

          };

        }
      );

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

    const updatedWishlist =
      wishlist.filter(
        (user) =>
          user.email !==
          email
      );

    /*
    IMPORTANT:

    Only save lightweight data.

    We remove the image before
    saving back to localStorage.

    This prevents Base64 images
    from being duplicated.
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

    localStorage.setItem(

      wishlistKey,

      JSON.stringify(
        lightweightWishlist
      )

    );

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

    navigate(
      "/view-profile",
      {
        state: {
          email:
            user.email,

          name:
            user.name,

          image:
            user.image,

          occupation:
            user.occupation,

          city:
            user.city,

          stateName:
            user.state
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

          <div className="wishlist-heading">

            <h1>
              ⭐ My Wishlist
            </h1>

            <p>
              Profiles you have saved for
              later.
            </p>

          </div>

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
                  navigate("/users")
                }
              >
                Browse Profiles
              </button>

            </div>

          ) : (

            <div className="wishlist-grid">

              {wishlist.map(
                (user) => (

                  <div
                    className="wishlist-card"
                    key={
                      user.email
                    }
                  >

                    {/* PROFILE IMAGE */}

                    <div className="wishlist-image-wrapper">

                      <img
                        src={
                          user.image
                        }
                        alt={
                          user.name
                        }
                        className="wishlist-image"
                      />

                    </div>

                    {/* PROFILE INFORMATION */}

                    <div className="wishlist-info">

                      <h3>
                        {user.name}
                      </h3>

                      <p className="wishlist-occupation">

                        {user.occupation ||
                          "Occupation not added"}

                      </p>

                      <p className="wishlist-location">

                        📍{" "}

                        {user.city ||
                          "Location not added"}

                        {user.state
                          ? `, ${user.state}`
                          : ""}

                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="wishlist-actions">

                      <button
                        className="wishlist-view-btn"
                        onClick={() =>
                          handleViewProfile(
                            user
                          )
                        }
                      >
                        👁 View Profile
                      </button>

                      <button
                        className="remove-wishlist-btn"
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

        </div>

      </div>
<PageNavigation
    previous="/tracking"
/>
    </div>

  );
}

export default Wishlist;