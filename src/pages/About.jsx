import PageNav from "../components/PageNav";
import styles from "./Dev.module.css";
import Svaneti from "../imgs/svaneti.png";

export default function Dev() {
  return (
    <main className={styles.devMainCS}>
      <PageNav />

      <div className={styles.devDivCS}>

        <div>
          <span> About World Wide Maps </span>
          <p>Discover new experiences across the world, make Your plans happen by connecting with the places You're interested in so let's navigate the world around You.
            <p>
              <a href="https://www.openstreetmap.org/about" target="__blank" rel="noreferrer">
                <i>OpenStreetMap®&nbsp; </i>
              </a>
              provides map data for thousands of websites, mobile apps, and hardware devices.
            </p>
          </p>
        </div>
        <img src={Svaneti} alt="Svaneti" />

      </div>
    </main >
  );
}
