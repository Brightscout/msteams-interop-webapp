import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import utils from '../utils';
import {ConnectedChannelData} from '../types';

/**
 * Base API service to be used across the application.
 * Endpoints can be injected using the .injectEndpoints method.
 * These endpoints are split keeping in mind the lazy loading of modules.
 */
const baseApi = createApi({
    reducerPath: 'baseApiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: `${utils.getBaseUrls().plugin}`,
        prepareHeaders: (headers) => {
            // We can modify the headers here
            return headers;
        },
        timeout: 30000,
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
