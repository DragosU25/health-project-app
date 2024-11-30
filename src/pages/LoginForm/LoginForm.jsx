import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../../redux/auth/authOperations";
import Button from "../../components/common/Button/Button";
import styles from "./LoginForm.module.css";
import Notiflix from "notiflix"; // Import Notiflix for notifications

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(loginUser(userData))
        .unwrap()
        .then(() => {
          dispatch(getCurrentUser());
        });

      Notiflix.Notify.success("Login successful!");
      navigate("/calculator"); // Redirect after successful login
      return action;
    } catch (error) {
      Notiflix.Notify.failure(
        "Login failed. Please check your credentials and try again."
      );
      console.error("Login failed:", error);
    }
  };

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Log in</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className={styles.input}
              required
            />
            <label htmlFor="email" className={styles.label}>
              Email*
            </label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className={styles.input}
              required
            />
            <label htmlFor="password" className={styles.label}>
              Password*
            </label>
          </div>
          <div className={styles.buttons}>
            <Button
              text={"Log in"}
              type={"submit"}
              extraClass={styles.button}
            />

            <Link to={"/register"}>
              <Button text={"Register"} extraClass={styles.transparentButton} />
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
