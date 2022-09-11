import {React} from 'react'
import ReactDOM from 'react-dom/client';
import GeoJsonMap from './containers/GeoJsonMap';

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
