/**
 * Includes redux state management for user actions such as login and update user.
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, getProfile, login, logout } from '../services/auth-service';
import {
  updateUser,
  findAllByName,
} from '../services/users-service';
import { dataOrStateError } from './helpers';

/**
 * Updates redux state with user profile after calling getProfile from user service.
 */
export const getProfileThunk = createAsyncThunk(
  'users/getProfile',
  async (data, ThunkAPI) => {
    const profile = await getProfile();
    return dataOrStateError(profile, ThunkAPI);
  }
);

/**
 * Calls the registration service and updates state with registered user.
 */
export const registerThunk = createAsyncThunk(
  'users/register',
  async (user, ThunkAPI) => {
    const res = await register(user);
    return dataOrStateError(res, ThunkAPI);
  }
);

/**
 * Calls the login service and updates state with logged in user.
 */
export const loginThunk = createAsyncThunk(
  'users/login',
  async (user, ThunkAPI) => {
    const res = await login(user);
    return dataOrStateError(res, ThunkAPI);
  }
);

/**
 * Logs the user out by calling the logout service.
 */
export const logoutThunk = createAsyncThunk(
  'users/logout',
  async (user, ThunkAPI) => {
    const res = await logout(user);
    return dataOrStateError(res, ThunkAPI);
  }
);

/**
 * Calls updateUser service to update user and then update state with the user.
 */
export const updateUserThunk = createAsyncThunk(
  'users/update',
  async (user, ThunkAPI) => {
    const res = await updateUser(user);

    return dataOrStateError(res, ThunkAPI);
  }
);

export const findUsersByNameThunk = createAsyncThunk(
  'users/findAllByName',
  async (nameOrUsername, ThunkAPI) => {
    console.log('find all by name thunk function', nameOrUsername);
    const users = await findAllByName(nameOrUsername);
    return dataOrStateError(users, ThunkAPI);
  }
);

/**
 * Checks if the logged in user in state has complete their profile.
 */
const checkProfileComplete = (state, user) => {
  if (!user || (user && !user.username)) {
    state.profileComplete = false;
  } else {
    state.data = user;
    state.profileComplete = true;
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    profileComplete: false,
    loggedIn: false,
    notifications: [],
    unreadNotifications: [],
    foundUsers: [],
  },
  reducers: {
    clearFoundUsers: (state) => {
      state.foundUsers = [];
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
    },
  },
  extraReducers: {
    [findUsersByNameThunk.pending]: (state, action) => {
      state.loading = false;
    },
    [findUsersByNameThunk.rejected]: (state) => {
      state.loading = false;
      console.log('find all by all users rejected');
    },
    [findUsersByNameThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.foundUsers = action.payload;
      console.log('find all by name fulfilled', state.foundUsers);
    },
    [getProfileThunk.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) return;
      checkProfileComplete(state, action.payload);
    },
    [getProfileThunk.rejected]: (state) => {
      state.loading = false;
    },
    [updateUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      checkProfileComplete(state, action.payload);
    },
    [registerThunk.pending]: (state) => {
      state.loading = true;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false;
      checkProfileComplete(state, action.payload);
    },
    [loginThunk.pending]: (state) => {
      state.loading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false;
      checkProfileComplete(state, action.payload);
    },
    [loginThunk.rejected]: (state, action) => {
      state.loading = false;
    },
    [logoutThunk.pending]: (state) => {
      state.loading = true;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = null;
      state.profileComplete = false;
    },
    [logoutThunk.rejected]: (state) => {
      state.loading = false;
      state.data = null;
      state.profileComplete = false;
    },
  },
});
export const { clearFoundUsers, setNotifications, setUnreadNotifications } = userSlice.actions;
export default userSlice.reducer;
