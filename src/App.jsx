import { useEffect } from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Router components
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import HomePage from './pages/HomePage';
import Enrollment from './components/Enrollment/enrollment';
import OtpPage from './pages/otppage/OtpPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import InstructorPage from './pages/instructorpage/InstructorPage';


const clientId = "997107527380-dq429gf5fnqu14negu0bk4ubrk1ja0o4.apps.googleusercontent.com";

function App() {
  

  useEffect(() => {
   
    console.log("App started")
  
  }, [])
  

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Router>
   <Routes>
   
   <Route path="/login" element={<Login />} />  {/* Login page at root */}
   <Route path="/signup" element={<Signup />} />  {/* Signup page route */}

 
   {/* Nested HomePage Routes */}
   <Route path="/*" element={<HomePage />} />

   <Route path='/entroleas' element={<Enrollment/>}></Route>


   <Route path='/instructor/*' element={<InstructorPage/>} />

   

   <Route path='/otp' element={<OtpPage/>}/>
   </Routes>
   </Router>
 

 
   </GoogleOAuthProvider>
  )
}

export default App
