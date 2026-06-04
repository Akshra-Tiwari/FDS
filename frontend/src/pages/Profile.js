import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

import "./Profile.css";

import toast from "react-hot-toast";

const Profile = () => {

  const [profile, setProfile] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [passwordData, setPasswordData] =
    useState({

      oldPassword: "",
      newPassword: ""

    });


  useEffect(() => {

    fetchProfile();

  }, []);


  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/users/profile",
            {

              headers: {
                Authorization:
                  `Bearer ${token}`
              }

            }
          );

        setProfile(
          response.data.user
        );

      } catch (error) {

        toast.error(
          "Failed to load profile"
        );

      } finally {

        setLoading(false);

      }

    };


  const updateProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          "/users/profile",

          profile,

          {

            headers: {
              Authorization:
                `Bearer ${token}`
            }

          }
        );

        toast.success(
          "Profile updated"
        );

      } catch {

        toast.error(
          "Update failed"
        );

      }

    };


  const changePassword =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          "/users/password",

          passwordData,

          {

            headers: {
              Authorization:
                `Bearer ${token}`
            }

          }
        );

        toast.success(
          "Password updated"
        );

        setPasswordData({

          oldPassword: "",
          newPassword: ""

        });

      } catch {

        toast.error(
          "Password update failed"
        );

      }

    };


  if (loading) {

    return (

      <div className="profile-loading">

        Loading Profile...

      </div>

    );

  }


  return (

    <>

      <Navbar />

      <div className="profile-page">

        <div className="profile-card">

          <h1>

            Profile Settings

          </h1>


          <label>

            Name

          </label>

          <input
            type="text"
            value={profile.name || ""}
            onChange={(e) =>

              setProfile({

                ...profile,

                name:
                  e.target.value

              })

            }
          />


          <label>

            Email

          </label>

          <input
            type="email"
            value={profile.email || ""}
            onChange={(e) =>

              setProfile({

                ...profile,

                email:
                  e.target.value

              })

            }
          />


          <button
            className="profile-btn"
            onClick={updateProfile}
          >

            Save Changes

          </button>

        </div>


        <div className="profile-card">

          <h2>

            Change Password

          </h2>


          <input
            type="password"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={(e) =>

              setPasswordData({

                ...passwordData,

                oldPassword:
                  e.target.value

              })

            }
          />


          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>

              setPasswordData({

                ...passwordData,

                newPassword:
                  e.target.value

              })

            }
          />


          <button
            className="profile-btn"
            onClick={changePassword}
          >

            Update Password

          </button>

        </div>

      </div>

    </>

  );

};

export default Profile;