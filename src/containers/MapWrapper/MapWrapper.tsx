import { React } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

interface MapWrapperProps {
  centerCoordinates: number[],
  tileAttribution: string,
  tileSource: string,
  zoom: number
}

const MapWrapper: React.FC<MapWrapperProps> = ({centerCoordinates, tileAttribution, tileSource, zoom}) => {
  return <MapContainer center={centerCoordinates} zoom={zoom}>
            <TileLayer
              attribution={tileAttribution}
              url={tileSource}
            />
          </MapContainer>
}

export default MapWrapper;
