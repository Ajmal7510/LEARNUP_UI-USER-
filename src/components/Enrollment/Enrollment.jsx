import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentImg from "../Assets/background-student.png";
import InstructorImg from "../Assets/background-instructor.png";
import styles from "./Enrollment.module.css"; // Import styles from the CSS module
import API from "../../utils/axios/asiosConfig";

const Enrollment = () => {
  const navigate = useNavigate();

  useEffect(() => {


     
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Redirecting to login page...");
      navigate("/login"); // Redirect to login page if token is not found
    }
  }, [navigate]);

  const handleEnrollment = async (role) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication failed. Redirecting to login page...");
        navigate("/login");
        return;
      }

      // Define the API URL and request body
      const apiUrl = "http://localhost:8080/user/set-enrollment";
      const body = { role };

      // Make the PATCH request
      const response = await axios.patch(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {

        if(response.data === "ROLE_STUDENT"){
          navigate("/")
        }
        else if(response.data === "ROLE_INSTRUCTOR"){
          navigate("/instructor")
        }
        
        
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Enrollment failed. Please try again.");
    }
  };

  return (
    <div className={styles.enrollmentContainer}>
      <div className={styles.topSection}>
        {/* Student Card */}
        <div className={styles.card}>
          <img
            src={StudentImg}
            alt="Enroll as Student"
            className={styles.cardImage}
          />
          <div className={styles.cardText}>
            <p>
              "Join as a student to unlock a world of learning opportunities.
              Access a diverse range of courses, engage with interactive
              content, collaborate with peers, and track your progress as you
              embark on your educational journey."
            </p>
          </div>
          <button
            className={styles.enrollButton}
            onClick={() => handleEnrollment("ROLE_STUDENT")}
          >
            Enroll as a Student
          </button>
        </div>

        {/* Instructor Card */}
        <div className={styles.card}>
          <img
            src={InstructorImg}
            alt="Enroll as Teacher"
            className={styles.cardImage}
          />
          <div className={styles.cardText}>
            <p>
              "Become a part of our vibrant teaching community by enrolling as a
              teacher. Share your expertise, create engaging courses, interact
              with students, and make a meaningful impact on learners' lives.
              Empower the next generation of learners with your knowledge and
              passion."
            </p>
          </div>
          <button
            className={styles.enrollButton}
            onClick={() => handleEnrollment("ROLE_INSTRUCTOR")}
          >
            Enroll as a Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
