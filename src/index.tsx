import {React} from 'react'
import ReactDOM from 'react-dom/client';
import GeoJsonMap from './containers/GeoJsonMap';
import L from "leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const centerCoordinates = [54.684, 25.275];
const mapZoom = 13;
const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileLayerSource = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const root = ReactDOM.createRoot(document.getElementById('map'));
const source = `${process.env.SOURCE_URL}`

root.render(
  <GeoJsonMap
  centerCoordinates={centerCoordinates}
  tileAttribution={tileLayerAttribution}
  tileSource={tileLayerSource}
  zoom={mapZoom}
  geoJsonSource={source}
  />
);
