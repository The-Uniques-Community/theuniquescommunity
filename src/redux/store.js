/**
 * @file store.js
 * @description Centralized Redux Toolkit state store configuration.
 * @architecture Created via Redux Toolkit `configureStore`, registering domain slice reducers (`userSlice`).
 * Mounted into the top-level React component tree by `<Provider store={store}>` in `src/main.jsx`.
 * @agent_note When introducing new application state domains, register additional slice reducers into the `reducer` configuration object.
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

/**
 * @desc Global Redux state store instance.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
const store = configureStore({
  reducer: {
    user: userReducer, // Add other slices here
  },
});

export default store;

