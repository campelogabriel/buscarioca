import { Position } from "../types/PositionType";

export const getRotation = (posAtual: Position, posFim: Position) => {
  if (!posAtual || !posFim) return 0;

  const latDiff = posAtual.latitude - posFim.latitude;
  const lngDiff = posAtual.longitude - posFim.longitude;
  return (Math.atan2(lngDiff, latDiff) * 180) / Math.PI;
};

// Nova forma de calcular rotation
// export const getRotation = (cord1: Position, cord2: Position) => {
//   if (cord2) {
//     const { latitude: lat1, longitude: lng1 } = cord1;
//     const { latitude: lat2, longitude: lng2 } = cord2;
//     const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
//     const x =
//       Math.cos(lat1) * Math.sin(lat2) -
//       Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
//     const θ = Math.atan2(y, x);
//     const brng = ((θ * 180) / Math.PI + 360) % 360;
//     return brng;
//   }
//   return 0;
// };
