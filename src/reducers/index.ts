import {combineReducers} from '@reduxjs/toolkit';

import baseApi from '../services';

// Add all reducers here
const reducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});

export default reducer;
