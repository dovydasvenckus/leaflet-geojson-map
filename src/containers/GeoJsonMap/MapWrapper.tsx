import React, { useState, useEffect, ReactNode } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import GeoJsonApi from "../../api/geoJsonApi";
import hash from "object-hash";
import L from "leaflet";
import Coordinate from "./Coordinate";

interface MapWrapperProps {
  children?: ReactNode[];
  geoJsonSources: string[];
  centerCoordinates: number[];
  tileAttribution: string;
  tileSource: string;
  zoom: number;
  maxZoom: number;
}

const createIcon = ({ type, visited }) =>
  L.icon({
    iconUrl: `/images/markers/${type}${!visited ? "-gray" : ""}.png`,

    iconSize: [32, 37],
    iconAnchor: [16, 30],
    popupAnchor: [0, -30],
  });

const formatGeoUrl = (label: string, coordinate: Coordinate) => {
  return `<a href="geo:${coordinate.latitude},${coordinate.longitude}">${label}</a>`;
};

const formatCoordinates = (geometry) => {
  const { coordinates } = geometry;
  const coordinateLabel = coordinates
    .map((number) => number.toFixed(4))
    .join(", ");

  return `coordinates: ${formatGeoUrl(coordinateLabel, {
    latitude: coordinates[0],
    longitude: coordinates[1],
  })}`;
};

const mapMarkers = (feature) => {
  const marker = L.marker(feature.geometry.coordinates.reverse(), {
    icon: createIcon(feature.properties),
  });

  const coordinatesLine = formatCoordinates(feature.geometry);
  const metaDataLines = Object.entries(feature.properties).map(
    (keyValuePair) => `${keyValuePair[0]}: ${keyValuePair[1]}`
  );

  marker.bindPopup([coordinatesLine, ...metaDataLines].join("<br>"));
  return marker;
};

const GeoJsonMap: React.FC<MapWrapperProps> = ({
  children,
  geoJsonSources,
  centerCoordinates,
  tileAttribution,
  tileSource,
  zoom,
  maxZoom,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadAllGeoJsons = async () => {
      const allGeoJsons = await Promise.all(
        geoJsonSources.map((geoJsonUrl) => GeoJsonApi.getGeoJson(geoJsonUrl))
      );

      setData(allGeoJsons.map((geoJsonResponse) => geoJsonResponse.data));
    };

    loadAllGeoJsons();
  }, [geoJsonSources]);

  return (
    <MapContainer center={centerCoordinates} zoom={zoom}>
      <TileLayer
        attribution={tileAttribution}
        url={tileSource}
        maxZoom={maxZoom}
      />
      {data.map((geoJson) => (
        <GeoJSON key={hash(geoJson)} data={geoJson} pointToLayer={mapMarkers} />
      ))}
      {children}
    </MapContainer>
  );
};

export default GeoJsonMap;
