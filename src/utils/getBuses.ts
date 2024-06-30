const getBuses = async (busesLines: string[], location) => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_BUS_LINES_URL}?line=${busesLines
        .join(",")
        .trim()}&lat=${location.at(0)}&lng=${location.at(1)}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default getBuses;
