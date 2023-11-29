import { useCities } from "../contexts/CitiesContext";
import Loader from "./Loader";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Loader />;

  if (!cities.length)
    return (
      <span className={styles.noCityCS}>
        Click to Your
        <span className="material-symbols-rounded">
          favorite
        </span>
        city on maps
      </span>
    );

  return (
    <ul className={styles.cityListCS}>
      {cities.map((city) => (<CityItem city={city} key={city.id} />))}
    </ul>
  );
}

export default CityList;
