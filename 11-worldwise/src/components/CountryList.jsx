import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList({ cities, isLoading }) {
  const countriesNames = new Set();
  const countries = cities
    .filter((city) => {
      if (countriesNames.has(city.country)) return false;

      countriesNames.add(city.country);
      return true;
    })
    .map((city) => {
      return { country: city.country, emoji: city.emoji, id: city.id };
    });

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
