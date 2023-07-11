import { combineReducers, configureStore } from "@reduxjs/toolkit";
import beerReducer from "../data/beer-slice";

const reducers = {
  beer: beerReducer,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  //   devTools: appEnv !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
