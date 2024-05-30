import { configureStore } from "@reduxjs/toolkit";
import lineReducer from "./sliceLines/sliceLines";
import positionReducer from "./slicePositions/slicePositions";
import settingsReducer from "./sliceSettings/sliceSettings";
import busesReducer from "./sliceBuses/sliceBuses";
import MarkerReducer from "./sliceMarker/sliceMarker";

export const store = configureStore({
  reducer: {
    lines: lineReducer,
    positions: positionReducer,
    settings: settingsReducer,
    buses: busesReducer,
    marker: MarkerReducer,
  },
});

export default store;
