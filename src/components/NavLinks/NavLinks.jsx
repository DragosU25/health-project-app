import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import styles from "./NavLinks.module.css";

const StyledLink = styled(NavLink)`
  color: #9b9faa;
  text-align: right;
  font-family: Verdana;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
  text-transform: uppercase;
  text-decoration: none;

  &.active {
    color: #212121;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;

  @media (min-width: 768px) {
    display: none;
  }

  div {
    width: 25px;
    height: 3px;
    background: #9b9faa;
  }
`;

export default function NavLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <HamburgerButton onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </HamburgerButton>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <StyledLink className={styles.auth} to={"/diary"}>
          Diary
        </StyledLink>
        <StyledLink className={styles.auth} to={"/calculator"}>
          Calculator
        </StyledLink>
      </nav>
    </div>
  );
}
