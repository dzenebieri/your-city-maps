import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";

import { useCities } from "../contexts/CitiesContext";
import { useGeoPosition } from "../hooks/useGeoPosition";
import { useLinkPosition } from "../hooks/useLinkPosition";
import Button from "./Button";
import styles from "./Map.module.css";

function Map() {
  const { cities } = useCities();
  const [mapLat, mapLng] = useLinkPosition();
  const [mapPosition, setMapPosition] = useState([40, 44]);
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeoPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  },
    [mapLat, mapLng]
  );

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapCS}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Your Location"}
        </Button>
      )}

      <MapContainer
        zoom={6}
        center={mapPosition}
        scrollWheelZoom={true}
        className={styles.mapContainerCS}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id} >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({ click: (e) => navigate(`form/location?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) });
}

export default Map;
