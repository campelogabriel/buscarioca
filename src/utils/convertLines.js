const convertIntegradasTroncal = (line) => {
  let linha = line;

  if (line.startsWith("TRO")) {
    if (line.includes("1")) linha = "100";
    if (line.includes("4")) linha = "104";
    if (line.includes("5")) linha = "105";
    if (line.includes("6")) linha = "108";
    if (line.includes("7")) linha = "117";
    if (line.includes("9")) linha = "109";
    return linha;
  }
  if (line.startsWith("INT")) {
    if (line.includes("1")) linha = "551";
    if (line.includes("2")) linha = "552";
    if (line.includes("6")) linha = "558";
    if (line.includes("8")) linha = "553";
    if (line.includes("9")) linha = "554";
    return linha;
  }
  return linha;
};

export default convertIntegradasTroncal;
