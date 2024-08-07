import { Position } from "../types/PositionType";

export const getRotation = (posAtual: Position, posFim: Position) => {
  if (!posAtual || !posFim) return 0;

  const latDiff = posAtual.latitude - posFim.latitude;
  const lngDiff = posAtual.longitude - posFim.longitude;
  return (Math.atan2(lngDiff, latDiff) * 180) / Math.PI;
};
