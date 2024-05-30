export default function (diff) {
  let time;
  if (diff < 31) {
    time = "Agora mesmo";
  } else if (diff >= 31 && diff < 60) {
    time = `${Math.trunc(diff)} segundos atrás`;
  } else if (diff >= 60 && diff < 121) {
    time = `1 minuto atrás`;
  } else if (diff > 3599 && diff < 7200) {
    time = `Mais de ${Math.trunc(diff / (60 * 60))} hora atrás`;
  } else if (diff >= 7200) {
    time = `Mais de ${Math.trunc(diff / (60 * 60))} hora atrás`;
  } else {
    time = `${Math.trunc(diff / 60)} minutos atrás`;
  }
  return time;
}
