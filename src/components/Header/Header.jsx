import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoImg, logoTextImg1, logoTextImg2, vector } from "../../utils";
import styles from "./Header.module.css";
import { logoutUser } from "../../redux/auth/authOperations";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../redux/auth/selectorsAuth";
import NavLinks from "../NavLinks/NavLinks";
import AuthLinks from "../AuthLinks/AuthLinks";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // State for controlling modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle the logout click
  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  // Function to confirm logout
  const confirmLogout = () => {
    dispatch(logoutUser());
    setIsModalVisible(false); // Close the modal after logout
  };

  // Function to cancel logout
  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          <Link to={"/"}>
            <div className={styles.logoContainer}>
              <img
                src={logoImg}
                alt="logo"
                className={styles.logo}
                width={46}
                height={44}
              />
              <div
                className={`${styles.logoTextContainer} ${
                  isLoggedIn ? styles.show : styles.hide
                }`}
              >
                <img src={logoTextImg1} alt="logo text" />
                <img src={logoTextImg2} alt="logo text" />
              </div>
              <div className={styles.vector}>
                <img src={vector} alt="vector" />
              </div>
            </div>
          </Link>

          {isLoggedIn ? (
            <div className={styles.authContainer}>
              <NavLinks />
            </div>
          ) : (
            <AuthLinks />
          )}
        </div>
      </header>

      {isLoggedIn && (
        <div className={styles.userContainer}>
          <p className={styles.name}>{user ? user.username : "username"}</p>
          <span>|</span>
          <button onClick={handleLogoutClick} className={styles.logoutButton}>
            Exit
          </button>
        </div>
      )}

      {/* Modal for confirming logout */}
      {isModalVisible && (
        <Modal isVisible={isModalVisible} handleModalClose={cancelLogout}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalText}>
              Are you sure you want to logout?
            </h2>
            <div className={styles.modalButtons}>
              <Button handlerFunction={confirmLogout} text={"Yes"} />
              <Button
                handlerFunction={cancelLogout}
                text={"No"}
                extraClass={styles.cancelButton}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
