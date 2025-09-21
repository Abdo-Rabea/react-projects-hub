import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";
import { flagemojiToPNG } from "../helper/helperFunctions";
import { useGeolocation } from "../hooks/useGeolocation";

function Map() {
  // const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();
  const { position, getPosition } = useGeolocation();

  // !wow: changing lat, lng in search queries will cause this component to re-render   wow
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // sync. lat, lng search params with geolocation
  useEffect(
    function () {
      if (position) setSearchParams({ lat: position.lat, lng: position.lng });
    },
    [position]
  );

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" onClick={getPosition}>
          get your location
        </Button>
      )}
      <MapContainer
        // this is just initialization
        center={[0, 0]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                <img src={flagemojiToPNG(city.emoji)} />
              </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[lat, lng]} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  if (position[0] && position[1]) map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
