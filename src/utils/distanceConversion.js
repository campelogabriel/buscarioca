export default function (distance) {
  let distanciaFinal;

  if (distance > 1000) {
    distanciaFinal = `${Math.trunc(distance / 1000)} km`;
  } else {
    distanciaFinal = `${Math.trunc(distance)} metros`;
  }
  return distanciaFinal;
}
