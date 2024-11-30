import React from "react";
import { HiX } from "react-icons/hi";
import styles from "./Modal.module.css"; // Asigură-te că ai stiluri pentru modal
import { mobileClose } from "../../../utils";

const Modal = ({ children, handleModalClose, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.closeContainer}>
        <button className={styles.mobileCloseButton} onClick={handleModalClose}>
          <img src={mobileClose} alt="" />
        </button>
      </div>
      <div className={`${styles.modalContent}`}>
        {" "}
        <button className={styles.closeButton} onClick={handleModalClose}>
          <HiX size="16px" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
