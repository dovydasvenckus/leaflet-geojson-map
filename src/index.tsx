import {React} from 'react'
import ReactDOM from 'react-dom/client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const root = ReactDOM.createRoot(document.getElementById('map'));
root.render(
  <MapContainer center={[54.684, 25.275]} zoom={13}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[54.684, 25.275]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
);
