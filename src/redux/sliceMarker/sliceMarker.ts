import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStates: string = "";

const sliceMarker = createSlice({
  name: "marker",
  initialState: initialStates,
  reducers: {
    addMarker(state, { payload }: PayloadAction<string>) {
      return payload;
    },
  },
});

export default sliceMarker.reducer;
export const { addMarker } = sliceMarker.actions;

export const useMarker = (state: any) => {
  return state.marker;
};
