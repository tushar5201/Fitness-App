import React, { useContext, useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import TextInput from "./TextInput";
import { Button } from "react-bootstrap";
import axios from "axios";
import { FoodCalories } from "../Context/foodContext";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 42px;
`;

const MobileIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.text_primary};

  @media screen and (max-width: 450px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.primary};
`;

const TextButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  // padding: 12px 40px 24px 40px;
  list-style: none;
  width: 90%;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = ({ currentUser }) => {
  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("nutritions");
    window.location.reload();
  }

  const [query, setQuery] = useState("");

  const foodNutritions = useContext(FoodCalories);

  const getData = async () => {
    const data = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, { headers: { "X-Api-Key": "reqqInYddl5xXOlrA9nUMQ==sr9Q6JAeCHChI5X5" } });
    foodNutritions.setNutritions(prevData => [...prevData, data.data.items[0]]);
    const nutritions = JSON.parse(localStorage.getItem("nutritions"));
    const updated = Object.assign(nutritions, data.data);
    localStorage.setItem("nutritions", updated)
  }

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">
          <Logo src={LogoImg} alt="Logo" />
        </NavLogo>
        <MobileMenu isOpen={isOpen}>
          <NavLinkStyled to="/" onClick={() => setIsOpen(false)}>Dashboard</NavLinkStyled>
          <NavLinkStyled to="/workouts" onClick={() => setIsOpen(false)}>Workouts</NavLinkStyled>
          {/* <NavLinkStyled to="/tutorials" onClick={() => setIsOpen(false)}>Tutorials</NavLinkStyled> */}
          <NavLinkStyled to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLinkStyled>
          <TextInput
            label="Query"
            type="text"
            placeholder="Enter your Meal (100g)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="btn btn-primary mt-4" onClick={getData}>Add</Button>
        </MobileMenu>
        <NavItems>
          <NavLinkStyled to="/">Dashboard</NavLinkStyled>
          <NavLinkStyled to="/workouts">Workouts</NavLinkStyled>
          <NavLinkStyled to="/tutorials">Tutorials</NavLinkStyled>
          <NavLinkStyled to="/contact">Contact</NavLinkStyled>
          <TextInput
            label="Query"
            type="text"
            placeholder="Enter your Meal (100g)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="btn btn-primary mt-4" onClick={getData}>Add</Button>
        </NavItems>
        <UserContainer>
          <TextButton>{currentUser?.data.name}</TextButton>
          <TextButton onClick={logout}>Logout</TextButton>
          <MobileIcon onClick={() => setIsOpen(!isOpen)}>
            <MenuRounded sx={{ color: "inherit" }} />
          </MobileIcon>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
