import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStates: number[] | null = [];

const slicePositions = createSlice({
  name: "positions",
  initialState: initialStates,
  reducers: {
    addPosition(state, { payload }: PayloadAction<number[]>) {
      return payload;
    },
  },
});

export default slicePositions.reducer;
export const { addPosition } = slicePositions.actions;

export const usePositions = (state: any) => {
  return state.positions;
};
