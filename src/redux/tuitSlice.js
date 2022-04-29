import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  findAllTuits,
  createTuit,
  deleteTuit,
} from '../services/tuits-service';
import { dataOrStateError } from './helpers';

/**
 * Uses tuits service to update state with all tuits. Also keeps track of loading status of requests.
 */
export const findAllTuitsThunk = createAsyncThunk(
  'tuits/findAllTuits',
  async (data, ThunkAPI) => {
    const tuits = await findAllTuits();
    return dataOrStateError(tuits, ThunkAPI);
  }
);

/**
 * Uses tuit service to crate a tuit and then makes another call to fetch all tuits to update state.
 */
export const createTuitThunk = createAsyncThunk(
  'tuits/createTuit',
  async ({ userId, tuit }, ThunkAPI) => {
    const newTuit = await createTuit(userId, tuit);
    ThunkAPI.dispatch(findAllTuitsThunk());
    return dataOrStateError(newTuit, ThunkAPI);
  }
);

/**
 * Uses tuit service to delete a tuit and then makes another call to fetch all tuits to update state.
 */
export const deleteTuitThunk = createAsyncThunk(
  'tuits/deleteTuit',
  async (tuitId, ThunkAPI) => {
    const newTuit = await deleteTuit(tuitId);
    ThunkAPI.dispatch(findAllTuitsThunk());
    return dataOrStateError(newTuit, ThunkAPI);
  }
);

const tuitSlice = createSlice({
  name: 'tuits',
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: {
    // for the async thunks
    [findAllTuitsThunk.pending]: (state) => {
      state.loading = true;
    },
    [findAllTuitsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = [...action.payload];
    },
    [findAllTuitsThunk.rejected]: (state, action) => {
      state.loading = false;
    },
    [createTuitThunk.pending]: (state) => {
      state.loading = true;
    },
    [createTuitThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createTuitThunk.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteTuitThunk.pending]: (state) => {
      state.loading = true;
    },
    [deleteTuitThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteTuitThunk.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default tuitSlice.reducer;
