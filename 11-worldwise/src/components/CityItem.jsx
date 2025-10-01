import { Link } from "react-router-dom";
import { flagemojiToPNG, formatDate } from "../helper/helperFunctions";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  function handleDelete(e) {
    e.preventDefault(); // this will prevent the default behaviour of Link
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          <img src={flagemojiToPNG(emoji)} alt="flag" />
        </span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
