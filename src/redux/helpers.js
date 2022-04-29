import { setGlobalError } from './errorSlice';

/**
 * Redux helper that checks if data returned from service contains an error. If so, updates the global error in errorSlice; otherwise, returns the passed-in data.
 */
export const dataOrStateError = (data, ThunkAPI) => {
  if (data.error) {
    return ThunkAPI.dispatch(setGlobalError(data)); //update errors
  }
  ThunkAPI.dispatch(setGlobalError({ error: '' })); //clear errors
  return data;
};
