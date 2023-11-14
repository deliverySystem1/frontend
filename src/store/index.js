import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userSlice from './user'
import orderSlice from './orders'
const reducer = combineReducers({
    user: userSlice,
    orders:orderSlice
})
const store = configureStore({ reducer })
export default store;