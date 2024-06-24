import { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FoodCalories } from "./Context/foodContext";
import { useState } from "react";
import Contact from "./pages/Contact";
import Tutorial from "./pages/Tutorial";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden; /* Updated to a single overflow property */
  transition: all 0.2s ease;
`;

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [nutritions, setNutritions] = useState([]);
  localStorage.setItem('nutritions', JSON.stringify(nutritions));

  return (
    <FoodCalories.Provider value={{ nutritions, setNutritions }}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <ToastContainer position="bottom-center" />
          <Container>
            {userInfo ? (
              <>
                <Navbar currentUser={userInfo} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/workouts" element={<Workouts />} />
                  {/* <Route path="/tutorials" element={<Tutorial />} /> */}
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </>
            ) : (
              <Authentication />
            )}
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </FoodCalories.Provider>
  );
}

export default App;
