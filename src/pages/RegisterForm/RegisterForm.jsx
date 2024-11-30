import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/authOperations";
import styles from "./RegisterForm.module.css";
import Button from "../../components/common/Button/Button";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              id="username"
              type="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username"
              className={styles.input}
              required
            />
            <label htmlFor="username" className={styles.label}>
              Username*
            </label>
          </div>

          <div className={styles.inputContainer}>
            <input
              id="email"
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
              id="password"
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
            <Button text={"Register"} extraClass={styles.transparentButton} />

            <Link to={"/login"}>
              <Button
                text={"Log in"}
                type={"submit"}
                extraClass={styles.button}
              />
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
