import { Link } from "react-router-dom";
import { flagemojiToPNG, formatDate } from "../helper/helperFunctions";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          <img src={flagemojiToPNG(emoji)} alt="flag" />
        </span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
