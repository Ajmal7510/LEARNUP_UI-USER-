import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [apiError, setApiError] = useState("");

  const dispatch = useDispatch();
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; // Remove specific error
      return updatedErrors;
    });
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
      return "Strong";
    }
    return "Medium";
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required.";
    if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setServerError(""); // Clear server error if validation fails
    } else {
      setLoading(true); // Start loading
      try {
        localStorage.setItem("signupData", JSON.stringify(formData));

        const response = await axios.post("http://localhost:8080/auth/generate-otp", {
          email: formData.email,
        });
        console.log("Form submitted successfully", response.data);
        setErrors({});
        setServerError("");

        navigate("/otp");
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setServerError(error.response?.data || "An error occurred.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/google", { token: idToken });

      if (response.status === 200) {
        const { token, user } = response.data;
        dispatch(login({ user, token }));
        navigate("/home");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Google Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Sign Up</h2>

        {serverError && <p className={styles.serverError}>{serverError}</p>}

        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
          {errors.mobileNumber && (
            <span className={styles.error}>{errors.mobileNumber}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>
          {passwordStrength && (
            <span
              className={`${styles.passwordStrength} ${
                styles[passwordStrength.toLowerCase()]
              }`}
            >
              {passwordStrength}
            </span>
          )}
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className={styles.googleAuth}>
          {loading ? (
            <div className={styles.loadingSpinner}>Loading...</div>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setApiError("Google Login failed. Please try again.")}
              buttonText="Login with Google"
            />
          )}
        </div>

        <br />

        <p className={styles.signupLink}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
