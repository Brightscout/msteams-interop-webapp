import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/**
 * Base API service to be used across the application.
 * Endpoints can be injected using the .injectEndpoints method.
 * These endpoints are split keeping in mind the lazy loading of modules.
 */
const baseApi = createApi({
    reducerPath: 'baseApiReducer',
    baseQuery: fetchBaseQuery({

        // TODO: change the Url later
        baseUrl: 'mockURL',
        prepareHeaders: (headers) => {
            // We can modify the headers here
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});

export default baseApi;
