import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assumes you're using react-router-dom for navigation
import styles from "./OtpPage.module.css";
import axios from "axios";

const OtpPage = () => {
  const [otp, setOtp] = useState(() =>
    JSON.parse(localStorage.getItem("otp")) || ["", "", "", ""]
  );
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem("timeLeft");
    return storedTime ? parseInt(storedTime, 10) : 300; // Default 5 mins
  });
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const signupData = JSON.parse(localStorage.getItem("signupData"));
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      setCanResend(false);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem("otp", JSON.stringify(otp));
    localStorage.setItem("timeLeft", timeLeft);
  }, [otp, timeLeft]);

  // Cleanup on unmount
  useEffect(() => {
    localStorage.removeItem("otp");
      localStorage.removeItem("timeLeft");
    return () => {
      localStorage.removeItem("otp");
      localStorage.removeItem("timeLeft");
    };
  }, []);

  // Handle OTP input change
  const handleChange = (value, index) => {
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8080/auth/resend-otp", {
        email: signupData.email,
      });
      setOtp(["", "", "", ""]);
      setTimeLeft(300);
      setError("");
      alert("OTP has been resent successfully!");
    } catch (error) {
      setError(
        error.response?.data || "Failed to resend OTP. Please try again."
      );
    }
  };

  // Format timer display
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Submit OTP
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.fullName,
        phoneNumber: signupData.phoneNumber,
        otp: otp.join(""),
      });
      alert("OTP Verified! Registration successful.");
      localStorage.setItem("token", response.data.token)
      console.log(response.data);
      navigate("/entroleas")
    } catch (error) {
      setError(
        error.response?.data || "Failed to verify OTP. Please try again."
      );
    }
  };

  // Navigate back to signup page
  const handleBack = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.otpContainer}>
        <h2 className={styles.heading}>Enter OTP</h2>
        <p className={styles.subtext}>
          Please enter the 4-digit OTP sent to your email/phone.
        </p>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.otpInputs}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className={styles.otpInput}
              />
            ))}
          </div>
          <p className={styles.timer}>OTP is valid for: {formatTime()}</p>
          <button
            className={`${styles.resendBtn} ${
              canResend ? styles.active : styles.disabled
            }`}
            onClick={handleResend}
            type="button"
            disabled={!canResend}
          >
            Resend OTP
          </button>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </form>
        <button className={styles.backBtn} onClick={handleBack}>
          Back to Signup
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
