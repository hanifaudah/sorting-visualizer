import { createSlice } from "@reduxjs/toolkit";

const grid = createSlice({
  name: "main",
  initialState: {
    arraySize: 40,
    speed: 10,
    timeouts: {},
    arrayValues: {},
    currentAlgorithm: "BUBBLE_SORT",
  },
  reducers: {
    setArraySize(state, { payload }) {
      return {
        ...state,
        arraySize: payload,
      };
    },
    setSpeed(state, { payload }) {
      return {
        ...state,
        speed: payload,
      };
    },
    setArrayValues(state, { payload }) {
      const vals = {};
      payload.map((val, idx) => (vals[idx] = val));
      return {
        ...state,
        arrayValues: vals,
      };
    },
    setTimeouts(state, { payload }) {
      return {
        ...state,
        timeouts: { ...payload },
      };
    },
    setCurrentAlgorithm(state, { payload }) {
      return {
        ...state,
        currentAlgorithm: payload,
      };
    },
  },
});

export const {
  setArraySize,
  setSpeed,
  setArrayValues,
  setTimeouts,
  setCurrentAlgorithm,
} = grid.actions;

export default grid.reducer;
