import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {PLUGIN_ID} from '../constants';

/**
 * Base API service to be used across the application.
 * Endpoints can be injected using the .injectEndpoints method.
 * These endpoints are split keeping in mind the lazy loading of modules.
 */
const baseApi = createApi({
    reducerPath: 'baseApiReducer',
    baseQuery: fetchBaseQuery({

        // TODO: change the Url later
        baseUrl: `https://e3c2-2405-201-402b-6c0f-9136-66-e463-7ab5.in.ngrok.io/plugins/${PLUGIN_ID}/api/v1/teams`,
        prepareHeaders: (headers) => {
            // We can modify the headers here
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        connectChannel: builder.mutation<void, ConnectChannelPayload>({
            query: (body) => ({
                url: '/channels/connect',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {useConnectChannelMutation} = baseApi;
export default baseApi;
