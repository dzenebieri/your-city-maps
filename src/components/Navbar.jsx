import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbarCS}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer>
        <p> &copy; Copyright {new Date().getFullYear()} by World Wide Maps Inc. </p>
      </footer>
    </div>
  );
}

export default Navbar;
