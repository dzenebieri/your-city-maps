import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { currCity, deleteCity } = useCities();
  const { cityName, emoji, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItemCS} ${id === currCity.id ? styles["activeCityItemCS"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emojiCS}>{emoji}</span>
        <span className={styles.cityNameCS}>{cityName}</span>
        <button className={styles.xBNCS} onClick={handleClick} > &times; </button>
      </Link>
    </li>
  );
}

export default CityItem;
