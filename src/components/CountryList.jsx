import { useCities } from "../contexts/CitiesContext";
import Loader from "./Loader";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

function CountryList() {
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

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryListCS}>
      {countries.map((country) => (<CountryItem country={country} key={country.country} />))}
    </ul>
  );
}

export default CountryList;
