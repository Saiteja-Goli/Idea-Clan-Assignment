import React from 'react';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
import CourseSelection from './components/CourseSelection';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import CourseManagement from './components/CourseManagement';
import LectureManagement from './components/LectureManagement';
import UserManagement from './components/UserManagement';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course-selection" element={<CourseSelection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/lectures" element={<LectureManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
