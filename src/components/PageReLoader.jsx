import Loader from "./Loader";
import styles from "./PageReLoader.module.css";

function PageReLoader() {
  return (
    <div className={styles.pageReLoader}>
      <Loader />
    </div>
  );
}

export default PageReLoader;
