import {React} from 'react'
import ReactDOM from 'react-dom/client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import MapWrapper from './containers/MapWrapper';

const centerCoordinates = [54.684, 25.275];
const mapZoom = 13;
const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileLayerSource = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const root = ReactDOM.createRoot(document.getElementById('map'));

root.render(
  <MapWrapper
  centerCoordinates={centerCoordinates}
  tileAttribution={tileLayerAttribution}
  tileSource={tileLayerSource}
  zoom={mapZoom}
  />
);
