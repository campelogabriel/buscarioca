import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStates: string[] | null = [];

const sliceLines = createSlice({
  name: "lines",
  initialState: initialStates,
  reducers: {
    addLines(state, { payload }: PayloadAction<string>) {
      if (state.includes(payload)) return [...state];
      return [...state, payload];
    },
    removeLines(state, { payload }: PayloadAction<string>) {
      if (!state.includes(payload)) return [...state];
      const filtered = state.filter((line) => line != payload);
      return [...filtered];
    },
  },
});

export default sliceLines.reducer;
export const { addLines, removeLines } = sliceLines.actions;

export const useLines = (state: any) => {
  return state.lines;
};
