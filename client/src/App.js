import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Error404 from "./components/Error404/Error404";

const Signup = lazy(() => import("./components/Signup/Signup"));
const Login = lazy(() => import("./components/Login/Login"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword/ResetPassword"));
const Dashboard = lazy(() => import ("./components/Dashboard/Dashboard"));
const Income = lazy(() => import ("./components/Income/Income"));
const Expense = lazy(() => import ("./components/Expense/Expense"));
const Profile = lazy(() => import("./components/Profile/Profile"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incomes" element={<Income />} />
        <Route path="/expenses" element={<Expense />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
