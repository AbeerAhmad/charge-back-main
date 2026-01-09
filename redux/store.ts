import { configureStore } from "@reduxjs/toolkit";
import layerReducer from "./slices/layer-slice";
import subscriptionReducer from "./slices/subscription-slice";

export const store = configureStore({
  reducer: {
    layer: layerReducer,
    subscriptions: subscriptionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["layer/addLayer"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.data.onSelect"],
        // Ignore these paths in the state
        ignoredPaths: ["layer.activeLayers"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
