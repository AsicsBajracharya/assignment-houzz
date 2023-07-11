import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import beerService from "./beer-service";
import { beerActions } from "./beer-slice";
import { RootState } from "../app/store";

export const handleGetBeers =
  (params?: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(beerActions.setLoading(true));
      const response = await beerService.getBeers(params);

      if (response.status === 200) {
        console.log("response", response.data);
        dispatch(beerActions.setBeers(response.data));
      }
    } catch (error: any) {
      dispatch(beerActions.setError(error.message || "Something went wrong"));
    } finally {
      dispatch(beerActions.setLoading(false));
    }
  };

export const handleOpenCreateModal =
  (val: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(beerActions.setopenCreateModal(val));
  };

export const handleCreateBeer =
  (beer: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(beerActions.setMyBeers(beer));
  };

export const handleSetMyBeer =
  (beer: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    console.log("beer from action handler", beer);
    dispatch(beerActions.setMyBeersFromLocal(beer));
  };
