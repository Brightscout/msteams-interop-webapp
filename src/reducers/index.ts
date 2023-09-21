import {combineReducers} from '@reduxjs/toolkit';

import baseApi from '../services';

import connectedReducer from './connectedState';

// Add all reducers here
const reducer = combineReducers({
    connectedReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export default reducer;
