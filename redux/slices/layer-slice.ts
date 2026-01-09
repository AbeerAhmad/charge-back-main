import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Layer {
  id: string;
  data?: any;
}

interface LayerState {
  activeLayers: Layer[];
}

const initialState: LayerState = {
  activeLayers: [],
};

const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    addLayer: (state, action: PayloadAction<{ id: string; data?: any }>) => {
      const { id, data } = action.payload;
      if (!id) return;
      state.activeLayers.unshift({ id, data });
    },
    closeActive: (state) => {
      state.activeLayers.shift();
    },
    clearLayers: (state) => {
      state.activeLayers = [];
    },
  },
});

export const { addLayer, closeActive, clearLayers } = layerSlice.actions;
export default layerSlice.reducer;

