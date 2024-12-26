import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState();
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch categories data
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/all-category");
      setCategories(response.data); // Set categories data
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch banners data
  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get-banner");
      if (response.status === 200) {
        console.log(response.data);
        
        setBanners(response.data); // Set banners data
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    Promise.all([fetchCategories(), fetchBanners()]).then(() => {
      setLoading(false); // Set loading to false after both API calls are completed
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  return (
    <div className={styles.homeContainer}>
      {/* Sliding Banner */}
      <div className={styles.banner}>
        <div className={styles.slide}>
          <img src={banners.image1} alt="Banner 1" />
        </div>
        <div className={styles.slide}>
          <img src={banners.image2} alt="Banner 2" />
        </div>
        <div className={styles.slide}>
          <img src={banners.image3} alt="Banner 3" />
        </div>
      </div>

      {/* Top Categories Section */}
      <div className={styles.categoriesSection}>
        <h2>Top Categories</h2>
        <p>Explore our Popular Categories</p>
        <div className={styles.grid}>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.icon}>
                  <img src={category.image} alt={category.name} />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description} Courses</p>
              </div>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
        <button className={styles.allCategoriesButton}>All Categories</button>
      </div>
    </div>
  );
};

export default Home;
