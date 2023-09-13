import { React, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import geoJsonApi from "../../api/geoJsonApi";

interface GeoJsonRoutesProps {
  sourceFiles: string[];
}

const GeoJsonRoutes: React.FC<GeoJsonRoutesProps> = ({ sourceFiles }) => {
  const map = useMap();
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadAllGeoJsons = async () => {
      const allGeoJsons = await Promise.all(
        sourceFiles.map((geoJsonUrl) => geoJsonApi.getGeoJson(geoJsonUrl))
      );
      setData(
        allGeoJsons.flatMap((geoJsonResponse) => geoJsonResponse.data.features)
      );
    };

    loadAllGeoJsons();
  }, [sourceFiles]);

  data.forEach((route) => {
    const { geometry } = route;
    const { coordinates } = geometry;
    const waypoints = coordinates.map(([longitude, latitude]) =>
      createWaypoint(longitude, latitude)
    );
    L.Routing.control({
      waypoints,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false,
      fitSelectedRoutes: false,
    }).addTo(map);
  });

  return null;
};

const createWaypoint = (longitude: number, latitude: number) =>
  L.Routing.waypoint(L.latLng(latitude, longitude));

export default GeoJsonRoutes;
