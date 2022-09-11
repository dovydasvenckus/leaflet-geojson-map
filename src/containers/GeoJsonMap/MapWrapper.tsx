import { React, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import GeoJsonApi from '../../api/geoJsonApi'
import hash from 'object-hash'
import L from 'leaflet'


interface MapWrapperProps {
  geoJsonSource: string,
  centerCoordinates: number[],
  tileAttribution: string,
  tileSource: string,
  zoom: number
}

const customIcon = L.icon({
  iconUrl: new URL('/src/images/hiking.png', import.meta.url).toString(),

  iconSize:     [32, 37],
  iconAnchor:   [16, 30],
  popupAnchor:  [0, -30]
});

const mapMarkers = (feature) => {
  const marker = L.marker(feature.geometry.coordinates.reverse(), {icon: customIcon});

  marker.bindPopup(Object.entries(feature.properties).map(keyValuePair => `${keyValuePair[0]}: ${keyValuePair[1]}`).join('<br>'));
  return marker;
}


const GeoJsonMap: React.FC<MapWrapperProps> = ({geoJsonSource, centerCoordinates, tileAttribution, tileSource, zoom}) => {
  const [data, setData] = useState(null);
  if (!data) {
    GeoJsonApi.getGeoJson(geoJsonSource).then(response => setData(response.data))
  }

  return <MapContainer center={centerCoordinates} zoom={zoom}>
            <TileLayer
              attribution={tileAttribution}
              url={tileSource}
            />
            <GeoJSON key={hash(data)} data={data} pointToLayer={mapMarkers} />
          </MapContainer>
}

export default GeoJsonMap;
