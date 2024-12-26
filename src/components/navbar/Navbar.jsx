import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import CSS module
import logo from "../Assets/logo.jpeg";
import API from "../../utils/axios/asiosConfig";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
 
  const [user,setUser] =useState(null) // Example username

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };


  useEffect(() => {
    const validateUser =async ()=>{


    const token=localStorage.getItem('token');


    console.log("Token: " + token);
    


    
    if(token!=null){
    try {
  
      const response = await axios.get('http://localhost:8080/user/get-user',
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }
      );
      console.log(response.data);
    
      
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error){
      console.error('Token validation failed:', error.message);
        alert('Session expired. Please log in again.');

    }
  }
    }


    validateUser();
  
   
  }, [])
  

  return (
    <nav className={styles.navbar}>
      {/* Left Section */}
      <div className={styles.navbarLeft}>
        <div className={styles.logo} onClick={() => handleNavigation("/home")}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
          Learn Up
        </div>
      </div>

      {/* Middle Section */}
      <div className={styles.navbarMiddle}>
        <ul className={styles.navLinks}>
          <li onClick={() => handleNavigation("/")}>Home</li>
          <li onClick={() => handleNavigation("/contact")}>Contact</li>
          <li onClick={() => handleNavigation("/about")}>About Us</li>
        </ul>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchBar}
        />
      </div>

      {/* Right Section */}
      <div className={styles.navbarRight}>
        {isLoggedIn ? (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.fullName}</span>
            <img
              src={user.profileImg} // Use a user profile picture here
              alt="Profile"
              className={styles.profileIcon}
            />
          </div>
        ) : (
          <div className={styles.authButtons}>
            <button className={styles.loginButton} onClick={() => handleNavigation("/login")}>Login</button>
            <button className={styles.signupButton} onClick={() => handleNavigation("/signup")}>Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
