import { flagemojiToPNG, formatDate } from "../helper/helperFunctions";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>
        <img src={flagemojiToPNG(emoji)} alt="flag" />
      </span>
      <span className={styles.name}>{cityName}</span>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
