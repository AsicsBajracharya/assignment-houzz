import { createSlice } from "@reduxjs/toolkit";
import { IBaseState } from "../interfaces";
import { useAppSelector } from "../hooks/redux-hooks";
import { setBeersLocally } from "../helpers/localStorageHelper";

export interface IBeerState extends IBaseState {
  beers: any;
  myBeers: Array<{}>;
  openCreateModal: boolean;
}

export const initialState: IBeerState = {
  isLoading: false,
  error: { message: "" },
  beers: [],
  myBeers: [],
  openCreateModal: false,
};

export const beerSlice = createSlice({
  name: "beer",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setBeers: (state, { payload }) => {
      state.beers = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setMyBeers: (state, { payload }) => {
      state.myBeers = [...state.myBeers, payload];
      setBeersLocally(state.myBeers);
    },
    setMyBeersFromLocal: (state, { payload }) => {
      state.myBeers = payload;
    },
    setopenCreateModal: (state, { payload }) => {
      state.openCreateModal = payload;
    },
  },
});

export const beerActions = beerSlice.actions;
export const beerSelctor = () => useAppSelector((state) => state.beer);
export default beerSlice.reducer;
