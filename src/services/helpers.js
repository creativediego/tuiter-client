/**
 * Checks if an API call error has the intended server error message. If so, returns the error; otherwise, if the error is unspecified, creates a friendly generic user-facing error.
 * @param err the error object caught from the API call
 * @returns the intended server error or a generic error message
 */
export const processError = (err) => {
  if (err.response.data.error) {
    return err.response.data;
  }
  return { error: 'Sorry! Something went wrong.' };
};
