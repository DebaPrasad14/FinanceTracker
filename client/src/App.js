import styled from "styled-components";
import bg from "./images/bg.png";
import { MainLayout } from "./styles/Layout";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expense from "./components/Expense/Expense";

const AppStyled = styled.div`
  height: 100vh;
  background: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;

    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

function App() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    return (
      (active === 3 && <Income />) ||
      (active === 4 && <Expense />) ||
      <Dashboard />
    );
  }

  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

export default App;
