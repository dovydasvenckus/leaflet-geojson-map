import { React } from "react";
import ReactDOM from "react-dom/client";
import LocateMe from "./components/LocateMe";
import GeoJsonMap from "./containers/GeoJsonMap";

const centerCoordinates = [54.684, 25.075];
const mapZoom = 10;
const tileLayerAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileLayerSource = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const root = ReactDOM.createRoot(document.getElementById("map-wrapper"));
const source = process.env.SOURCE_URLS.split(" ");

root.render(
  <GeoJsonMap
    centerCoordinates={centerCoordinates}
    tileAttribution={tileLayerAttribution}
    tileSource={tileLayerSource}
    zoom={mapZoom}
    maxZoom={19}
    geoJsonSources={source}
  >
    <LocateMe maxLocateZoom={10}/>
  </GeoJsonMap>
);
