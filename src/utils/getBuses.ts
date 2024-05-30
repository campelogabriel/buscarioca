const getBuses = async (busesLines: string[], location) => {
  console.log("busesLinesFromGetBuses ", busesLines);
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_BUS_LINES_URL}?line=${busesLines
        .join(",")
        .trim()}&lat=${location.at(0)}&lng=${location.at(1)}`
    );
    const data = await res.json();
    console.log("data: ", data);
    return data;
  } catch (err) {
    return err;
  }
};

export default getBuses;
