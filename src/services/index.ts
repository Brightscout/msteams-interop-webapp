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
        baseUrl: `https://e9ae-2405-201-402b-6c0f-7b88-9e95-c1e5-7203.in.ngrok.io/plugins/${PLUGIN_ID}/api/v1/teams`,
        prepareHeaders: (headers) => {
            // We can modify the headers here
            return headers;
        },
    }),
    tagTypes: ['ChannelConnect'],
    endpoints: (builder) => ({
        connectChannel: builder.mutation<void, ConnectChannelPayload>({
            query: (body) => ({
                url: '/channels/connect',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ChannelConnect'],
        }),
        getConnectedChannels: builder.query<ConnectedChannelData[], void>({
            query: () => ({
                url: '/channels',
                method: 'GET',
            }),
            providesTags: ['ChannelConnect'],
        }),
        disconnectUser: builder.query<void, void>({
            query: () => ({
                url: '/oauth2/disconnect',
                method: 'GET',
            }),
        }),
        disconnectChannel: builder.mutation<void, DisconnectChannelPayload>({
            query: (body) => ({
                url: '/channels/disconnect',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ChannelConnect'],
        }),
    }),
});

export const {
    useConnectChannelMutation,
    useGetConnectedChannelsQuery,
    useLazyGetConnectedChannelsQuery,
    useLazyDisconnectUserQuery,
    useDisconnectChannelMutation,
} = baseApi;
export default baseApi;
