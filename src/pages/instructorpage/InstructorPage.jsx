import React from 'react'
import styles from './InstructorPage.module.css'
import { Route, Routes } from 'react-router-dom'
import Overview from '../../components/instructor_navbar/overview/Overview'
import MyCourses from '../../components/instructor_navbar/mycourses/MyCourses'

import Assessments from '../../components/instructor_navbar/assessments/Assessments'
import Messages from '../../components/instructor_navbar/messages/Messages'
import Profile from '../../components/instructor_navbar/profile/Profile'
import InstructorNavbar from '../../components/instructor_navbar/InstructorNavbar'
import Analytics from '../../components/instructor_navbar/analytics/Analytics'

const InstructorPage = () => {
  return (
    <div className={styles.adminPageContainer}>
     
      <InstructorNavbar />
      
      {/* Main content area */}
      <div className={styles.mainContainer}>
        {/* Define Routes for each section */}
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          
          
          {/* Placeholder for nested routes */}
          <Route path="/" element={<Overview />} /> {/* Default route */}
        </Routes>
        {/* Outlet for rendering the matched nested route */}
        
      </div>
    </div>
  )
}

export default InstructorPage
