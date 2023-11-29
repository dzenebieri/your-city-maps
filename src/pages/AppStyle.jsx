import Navbar from "../components/Navbar";
import Map from "../components/Map";
import User from "../components/User";
import styles from "./AppStyle.module.css";

function AppStyle() {
  return (
    <div className={styles.appCS}>
      <Navbar />
      <Map />
      <User />
    </div>
  );
}

export default AppStyle;
