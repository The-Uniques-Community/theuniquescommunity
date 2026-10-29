/**
 * @file userSlice.js
 * @description Redux Toolkit slice managing current user session and authentication status.
 * @architecture Registered under the `user` branch of the global Redux store (`src/redux/store.js`).
 * Actions `setUser` and `clearUser` are dispatched by auth views upon successful login, profile loading, or logout.
 * @agent_note When `setUser` is dispatched, it sets `isAuthenticated: true` and writes the user payload.
 * Token management in localStorage is handled separately in auth handlers and networking interceptors (`src/config.js`).
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * @desc Initial state for user authentication slice.
 * @type {{ currentUser: Object|null, isAuthenticated: boolean }}
 */
const initialState = {
  currentUser: null, // Stores the current user's data
  isAuthenticated: false, // Tracks if the user is authenticated
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * @desc Sets the active authenticated user profile in state.
     * @param {Object} state - Current user slice state.
     * @param {Object} action - Action with payload containing authenticated user details.
     */
    setUser(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    /**
     * @desc Clears the authenticated user state upon logout or session termination.
     * @param {Object} state - Current user slice state.
     */
    clearUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export reducer

