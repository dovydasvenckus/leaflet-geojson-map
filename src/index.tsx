import { React } from "react";
import ReactDOM from "react-dom/client";
import LocateMe from "./components/LocateMe";
import GeoJsonMap from "./containers/GeoJsonMap";

const source = import.meta.env.VITE_SOURCE_URLS.split(" ");
const centerCoordinates = import.meta.env.VITE_CENTER_COORDINATES.split(
  ","
).map((c) => c as number);
const mapZoom = import.meta.env.VITE_MAP_ZOOM as number;
const shouldCenterOnClientLocation = import.meta.env.VITE_LOCATE_ME === "true";
const tileLayerAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileLayerSource = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const root = ReactDOM.createRoot(document.getElementById("map-wrapper"));

root.render(
  <GeoJsonMap
    centerCoordinates={centerCoordinates}
    tileAttribution={tileLayerAttribution}
    tileSource={tileLayerSource}
    zoom={mapZoom}
    maxZoom={19}
    geoJsonSources={source}
  >
    {shouldCenterOnClientLocation && <LocateMe maxLocateZoom={10} />}
  </GeoJsonMap>
);
