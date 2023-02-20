import {combineReducers} from '@reduxjs/toolkit';

import baseApi from '../services';

import testReducer from './testReducer';

// Add all reducers here
const reducer = combineReducers({

    // TODO: remove later
    testReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export default reducer;
