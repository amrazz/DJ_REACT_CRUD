import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../../../redux/reducers";
import { handleImageUpload, handleSaveProfileData } from "./profileHelper";
import EditProfile from "./editProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [mainUsername, setMainUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newProfileData, setNewProfileData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const username = useSelector((state) => state.auth.user);
  console.log("Username from profile first:", username);

  useEffect(() => {
    if (username) {
      setMainUsername(username);
      console.log("Main username:", mainUsername);
    }
  }, [username]);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (!token) {
          throw new Error("No access token found");
        }

        console.log("Fetching profile data for username:", mainUsername);
        const response = await axios.get(
          `http://localhost:8000/api/profile/?username=${mainUsername}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Profile data fetched:", response.data);
        setProfileData(response.data.user);
        setNewProfileData(response.data.user);

        setProfileImage(response.data.profile_image || null);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (mainUsername) {
      fetchProfileData();
    }
  }, [mainUsername]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
    handleImageUpload(file, username, setProfileData, setError);
  };

  const handleSaveProfile = async (data) => {
    await handleSaveProfileData(
      data,
      mainUsername,
      setProfileData,
      () => setEditing(false),
      setError,
      setMainUsername,
      dispatch,
      loginSuccess
    );
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();  
    navigate("/login");  
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="absolute right-4 bottom-4">
        <button class="relative inline-block px-4 py-2 font-montserrat font-medium group" onClick={handleLogout} >
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span class="relative text-black group-hover:text-white">
            Logout
          </span>
        </button>
      </div>
      <div className="relative bg-gray-100 rounded-lg shadow-lg p-8 max-w-md w-full text-center mt-6">
        <label htmlFor="profile-image-upload">
          <div className="absolute -top-12 -right-12 border-4 border-white rounded-full w-36 h-36 overflow-hidden">
            <img
              className="w-full h-full object-cover cursor-pointer"
              src={
                profileImage ||
                "https://t4.ftcdn.net/jpg/08/42/83/61/240_F_842836175_bC54y6LCZHSQZCJnMpx6z950M7MQUCZW.jpg"
              }
              alt="User Profile"
            />
          </div>
        </label>
        <input
          type="file"
          id="profile-image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <div className="mt-12 flex flex-col items-center space-y-7">
          {editing ? (
            <EditProfile
              profileData={profileData}
              onSubmit={handleSaveProfile}
              handleCancelEdit={handleCancelEdit}
            />
          ) : (
            <>
              <h2 className="text-3xl font-bold font-mono tracking-widest text-gray-800">
                Username:{" "}
                <span className="text-blue-600 tracking-wide">
                  {profileData?.username?.toUpperCase()}
                </span>
              </h2>
              <p className="text-gray-600 font-mono tracking-widest font-bold text-lg">
                Name:{" "}
                <span className="text-gray-800">
                  {profileData?.first_name} {profileData?.last_name}
                </span>
              </p>
              <p className="text-gray-600 font-bold tracking-widest font-mono text-lg">
                Email:{" "}
                <span className="text-gray-800">{profileData?.email}</span>
              </p>
            </>
          )}
        </div>

        {!editing && (
          <div className="mt-6">
            <button
              onClick={() => setEditing(true)}
              type="button"
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Edit Profile</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
