import React from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { setFormType } from "../../redux/form/formSlice";

import styles from "./AuthLinks.module.css";
import { useDispatch } from "react-redux";

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

export default function AuthLinks() {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <StyledLink
          className={styles.auth}
          to={"/login"}
          onClick={() => dispatch(setFormType("login"))}
        >
          Log in
        </StyledLink>

        <StyledLink
          className={styles.auth}
          to={"/register"}
          onClick={() => dispatch(setFormType("registration"))}
        >
          Registration
        </StyledLink>
      </nav>
    </div>
  );
}
