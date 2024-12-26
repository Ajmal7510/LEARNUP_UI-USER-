import React, { useState } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Default Profile Image
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    // Simulating a backend call with fetch
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Password changed successfully!");
        setErrorMessage("");
        setOldPassword("");
        setNewPassword("");
      } else {
        throw new Error(result.message || "Something went wrong!");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.profileContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1>Profile</h1>
      </div>

      {/* Profile Section */}
      <div className={styles.profileCard}>
        <div className={styles.imageSection}>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
          <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
            Update
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.imageUploadInput}
          />
        </div>
        <div className={styles.detailsSection}>
          <h2>Jessica Alba</h2>
          <p>@jennywilson</p>
          {/* Static Profile Details */}
          <div className={styles.detailItem}>
            <label>Username:</label>
            <span>Jenny Wilson</span>
          </div>
          <div className={styles.detailItem}>
            <label>Email:</label>
            <span>jenny@gmail.com</span>
          </div>
          <div className={styles.detailItem}>
            <label>Address:</label>
            <span>New York, USA</span>
          </div>
          <div className={styles.detailItem}>
            <label>Nickname:</label>
            <span>Sky Angel</span>
          </div>
          <div className={styles.detailItem}>
            <label>DOB:</label>
            <span>April 28, 1981</span>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className={styles.changePasswordCard}>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className={styles.inputGroup}>
            <label htmlFor="oldPassword">Previous Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Profile;
