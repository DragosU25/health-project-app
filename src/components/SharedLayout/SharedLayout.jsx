import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import styles from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
