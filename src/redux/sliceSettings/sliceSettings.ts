import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type typeSettings = {
  isEnabledAutomate: boolean;
  mapStyles: string;
};

const initialStates: null | typeSettings = {
  isEnabledAutomate: true,
  mapStyles: "padrao",
};

const sliceSettings = createSlice({
  name: "settings",
  initialState: initialStates,
  reducers: {
    setAutomatedFetch(state, { payload }: PayloadAction<boolean>) {
      return { ...state, isEnabledAutomate: payload };
    },
    setMapStyles(state, { payload }: PayloadAction<string>) {
      return { ...state, mapStyles: payload };
    },
  },
});

export default sliceSettings.reducer;
export const { setAutomatedFetch, setMapStyles } = sliceSettings.actions;

export const useSettings = (state: any) => {
  return state.settings;
};
