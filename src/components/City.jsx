import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import Loader from "./Loader";
import BackBN from "./BackBN";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currCity;

  if (isLoading) return <Loader />;

  return (
    <div className={styles.cityCS}>
      <div className={styles.infoDivCS}>
        <span className={styles.infoSpanCS}>City</span>
        <span className={styles.infoSubSpanCS}> <span>{emoji}</span> {cityName} </span>
      </div>

      <div className={styles.infoDivCS}>
        <span className={styles.infoSpanCS}>First Visit Date</span>
        <span className={styles.infoSubSpanCS}>{formatDate(date || null)}</span>
      </div>

      {notes && (
        <div className={styles.infoDivCS}>
          <span className={styles.infoSpanCS}>About</span>
          <span className={styles.infoSubSpanCS}>{notes}</span>
        </div>
      )}

      <div className={styles.infoDivCS}>
        <span className={styles.infoSpanCS}>Read More</span>
        <span>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            About {cityName}
            <span className="material-symbols-rounded">
              navigate_next
            </span>
          </a>
        </span>
      </div>

      <div>
        <BackBN />
      </div>
    </div>
  );
}

export default City;
