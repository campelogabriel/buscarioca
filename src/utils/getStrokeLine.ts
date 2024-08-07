const getStrokeLine = async (line: string) => {
  //INDIVIDUO VAI CLICAR NO BTN E CASO NÃO HAJA UMA COORDENADA DA LINHA NO AMARZEM LOCAL
  //IRÁ DAR UM FETCH, BUSCAR AS ROTAS E AMARZENA LOCALMENTE
  //MELHOR SALVAR TUDO NO REDUX
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_COORDS_BUS_LINES_URL}/${line}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default getStrokeLine;
