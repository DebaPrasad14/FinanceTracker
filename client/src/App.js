import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import bg from "./images/bg.png";
import { MainLayout } from "./styles/Layout";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
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
        <Route
          path="/*"
          element={
            <AppStyled bg={bg} className="App">
              <MainLayout>
                <Navigation />
                <main>
                  <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/incomes" element={<Income />} />
                    <Route path="/expenses" element={<Expense />} />
                  </Routes>
                </main>
              </MainLayout>
            </AppStyled>
          }
        />
      </Routes>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 8px;

    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
