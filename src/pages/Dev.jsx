import PageNav from "../components/PageNav";
import styles from "./Dev.module.css";
import Pro from "../imgs/Pro.png";

export default function Dev() {
  return (
    <main className={styles.devMainCS}>
      <PageNav />

      <div className={styles.devDivCS}>

        <img src={Pro} alt="MacBook Pro" />
        <div>
          <span>About Developer</span>
          <p>This Application is Developed by &nbsp;
            <a href="https://dzenebieri.github.io" target="__blank">
              dzenebieri
            </a>
            &nbsp;&nbsp;in&nbsp;&nbsp;
            <b>ReactJS</b>
          </p>
        </div>

      </div>
    </main >
  );
}
