import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bus } from "../../types/BusType";
import { getDifference } from "../../utils/getDifference";
import { getRotation } from "../../utils/getRotationBus";

const initialStates: Bus[] | any | null = [];

function addTag(line) {
  let tags = ["SV", "SN", "SE", "SR", "SP", "SD", "SVA", "SVB", "SPA", "SPB"];

  if (tags.some((str) => line.startsWith(str))) return [line];

  let lineNumbers = tags.map((tag) => {
    return `${tag}${line}`;
  });
  lineNumbers.push(line);
  return lineNumbers;
}

const sliceBuses = createSlice({
  name: "buses",
  initialState: initialStates,
  reducers: {
    addBus(state, { payload }: PayloadAction<Bus>) {
      //Pegar o bus que tem o mesmo numero na carroceria
      let busOld = state.find((bus) => bus.ordem == payload.ordem);

      let isLowerThan5Meters;
      let isSamePosition;

      //Verifica se a atualização foi menor que 10 metros
      if (busOld) {
        isLowerThan5Meters =
          getDifference(
            busOld.latitude,
            payload.latitude,
            busOld.longitude,
            payload.longitude
          ) < 0.05;

        isSamePosition =
          busOld.latitude == payload.latitude &&
          busOld.longitude == payload.longitude;
      }

      let busUpdated;
      //verifica se existe
      if (busOld) {
        busUpdated = {
          ordem: busOld.ordem,
          linha: busOld.linha,
          oldName: busOld.oldName,
          destino: payload.destino,
          noturno: payload.noturno,
          count: isLowerThan5Meters ? busOld.count : busOld.count + 1,
          latitude: isLowerThan5Meters ? busOld.latitude : payload.latitude,
          longitude: isLowerThan5Meters ? busOld.longitude : payload.longitude,
          distancia: payload.distancia,
          velocidade: payload.velocidade,
          datahora: payload.datahora,
          root: isLowerThan5Meters
            ? busOld.root
            : getRotation(
                {
                  latitude: busOld.latitude,
                  longitude: busOld.longitude,
                },
                {
                  latitude: payload.latitude,
                  longitude: payload.longitude,
                }
              ),
        };

        const newState = state.filter((bus) => bus.ordem !== payload.ordem);
        return [...newState, busUpdated];
      } else {
        const newState = state.filter((bus) => bus.ordem !== payload.ordem);
        const busNew = { ...payload, count: 1 };
        return [...newState, busNew];
      }
    },
    removeBus(state, { payload }: PayloadAction<Bus>) {
      const filtered = state.filter((bus) => bus.ordem !== payload.ordem);
      return [...filtered];
    },
    reset(state) {
      return [];
    },
    removeBusByLine(state, { payload }: PayloadAction<string>) {
      const x = addTag(payload);
      // const filtered = state.filter((bus) => bus.linha !== payload);
      const filtered = state.filter((bus) => !x.includes(bus.linha));
      return [...filtered];
    },
  },
});

export default sliceBuses.reducer;
export const { addBus, removeBus, removeBusByLine } = sliceBuses.actions;

export const useBuses = (state: any) => {
  return state.buses;
};
