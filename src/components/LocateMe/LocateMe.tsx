import { React } from "react";
import { useMap } from "react-leaflet";

interface LocateMeProps {
  maxLocateZoom: number
}

const LocateMe: React.FC<LocateMeProps> = ({maxLocateZoom}) => {
  const map = useMap();
  map.locate({setView: true, maxZoom: maxLocateZoom});
  return null;
}


export default LocateMe;
