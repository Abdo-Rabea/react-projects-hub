import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleSetPosition() {
    setSearchParams({ lat: "30.2", lng: "29.3" });
  }
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        <p>
          lat = {lat}
          lng = {lng}
        </p>
      </h1>
      <button onClick={handleSetPosition}>go to me</button>
    </div>
  );
}

export default Map;
