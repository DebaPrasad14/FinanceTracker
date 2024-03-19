import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import bg from "./images/bg.png";
import { MainLayout } from "./styles/Layout";
import Navigation from "./components/Navigation/Navigation";

const Dashboard = lazy(() => import ("./components/Dashboard/Dashboard"));
const Income = lazy(() => import ("./components/Income/Income"));
const Expense = lazy(() => import ("./components/Expense/Expense"))

function App() {
  return (
    <Router>
      <AppStyled bg={bg} className="App">
        <MainLayout>
          <Navigation />
          <main>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incomes" element={<Income />} />
              <Route path="/expenses" element={<Expense />} />
            </Routes>
          </main>
        </MainLayout>
      </AppStyled>
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
    border-radius: 20px;

    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
