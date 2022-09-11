import { React, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import GeoJsonApi from '../../api/geoJsonApi'
import hash from 'object-hash'

interface MapWrapperProps {
  geoJsonSource: string,
  centerCoordinates: number[],
  tileAttribution: string,
  tileSource: string,
  zoom: number
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
            <GeoJSON key={hash(data)} data={data}></GeoJSON>
          </MapContainer>
}

export default GeoJsonMap;
