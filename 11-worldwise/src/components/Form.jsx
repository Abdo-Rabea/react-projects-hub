// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { flagemojiToPNG } from "../helper/helperFunctions";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const { lat, lng } = useCurrentPosition();

  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [cityError, setCityError] = useState(null);
  const { createCity, isLoading } = useCities();

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    createCity(newCity).then(() => navigate("/app/cities"));
  }

  useEffect(
    function () {
      async function getCountryData() {
        if (!lat || !lng) return;
        try {
          setIsLoadingCity(true);
          setCityError(null);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. click somewhere elese 🙃"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setCityError(err.message);
        } finally {
          setIsLoadingCity(false);
        }
      }
      getCountryData();
    },
    [lat, lng]
  );

  if (isLoadingCity) return <Spinner />;

  if (!lat || !lng)
    return <Message message="start by clicking somewhere in the map" />;
  if (cityError) return <Message message={cityError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img src={flagemojiToPNG(emoji)} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
