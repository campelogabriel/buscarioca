function getDifferenceDateInMileseconds(date) {
  const dataFinal = new Date(date);

  // dataFinal.setHours(dataFinal.getHours() + 12);
  dataFinal.setMinutes(dataFinal.getMinutes() + 10);

  return dataFinal.getTime();
}

export default getDifferenceDateInMileseconds;
