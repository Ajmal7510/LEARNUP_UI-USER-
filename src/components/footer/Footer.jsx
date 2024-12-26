import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo and Description */}
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>Learn Up</h2>
          <p className={styles.description}>
            Learn Up is an innovative e-learning platform offering diverse courses to help you achieve your goals and grow your skills.
          </p>
        </div>

        {/* Get Help Links */}
        <div className={styles.linkSection}>
          <h3 className={styles.sectionTitle}>Get Help</h3>
          <ul className={styles.links}>
            <li>Contact Us</li>
            <li>Latest Articles</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Programs Links */}
        <div className={styles.linkSection}>
          <h3 className={styles.sectionTitle}>Programs</h3>
          <ul className={styles.links}>
            <li>Art & Design</li>
            <li>Business</li>
            <li>IT & Software</li>
            <li>Languages</li>
            <li>Programming</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <p>Address: 123 Main Street, E-Learning City, USA</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: support@learnup.com</p>
          <div className={styles.socialIcons}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright © 2024 Learn Up </p>
      </div>
    </footer>
  );
};

export default Footer;
