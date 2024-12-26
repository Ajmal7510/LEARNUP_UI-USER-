import React from 'react'
import styles from './InstructorNavbar.module.css'
import {SidebarData} from  './InstructorNavbarData'
import { NavLink } from 'react-router-dom'
const InstructorNavbar = () => {
  return (
    <div className={styles.Sidebar}>
    <div className={styles.AdminTitle}>Instructor</div>
    <ul className={styles.SidebarList}>
      {SidebarData.map((item, index) => (
        <li key={index} className={styles.row}>
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive ? `${styles.row} ${styles.active}` : styles.row
            }
          >
            <div id={styles.icon}>{item.icon}</div>
            <div id={styles.title}>{item.title}</div>
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default InstructorNavbar
