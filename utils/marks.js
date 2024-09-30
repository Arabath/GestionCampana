// https://github.com/pointhi/leaflet-color-markers
import greenMark from "../assets/greenMark.png";
import goldMark from "../assets/goldMark.png";
import blueMark from "../assets/blueMark.png";
import shadowMark from "../assets/shadowMark.png";

export const greenIcon = new L.Icon({
  iconUrl: greenMark,
  shadowUrl: shadowMark,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const goldIcon = new L.Icon({
  iconUrl: goldMark,
  shadowUrl: shadowMark,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const blueIcon = new L.Icon({
  iconUrl: blueMark,
  shadowUrl: shadowMark,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
