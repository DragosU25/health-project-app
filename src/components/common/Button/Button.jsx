import React from "react";
import styles from "./Button.module.css";

const Button = ({
  type,
  text,
  handlerFunction,
  variant,
  isDisabled = false,
  extraClass = "", // Adăugăm extraClass cu valoare implicită goală
}) => {
  return (
    <button
      type={type}
      onClick={handlerFunction}
      className={`${styles.button} ${styles[variant]} ${extraClass}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
