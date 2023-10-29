import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userSlice from './user'
const reducer = combineReducers({
    user: userSlice
})
const store = configureStore({ reducer })
export default store;