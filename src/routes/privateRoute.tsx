import React, {useEffect} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import LoadingPage from '../components/loadingPage';

import ConnectPage from '../containers/ConnectPage';
import HomePage from '../containers/HomePage';
import {setConnected} from '../reducers/connectedState';
import {useReduxDispatch, useReduxSelector} from '../hooks';

import {useGetConnectedChannelsQuery} from '../services';

const PrivateRoute = () => {
    const dispatch = useReduxDispatch();
    const isConnected = useReduxSelector((state) => state.connectedReducer.connected);

    const {isLoading, isSuccess, isError, isFetching, error} = useGetConnectedChannelsQuery();

    useEffect(() => {
        if (isSuccess && !(isLoading || isFetching)) {
            dispatch(setConnected(true));
        }

        if (isError && ((error as FetchBaseQueryError).data as string).includes('not authorized')) {
            dispatch(setConnected(false));
        }
    }, [isSuccess, isError, isLoading, isFetching]);

    if (isLoading) {
        return (
            <LoadingPage
                label='Loading...'
                inline={true}
            />
        );
    }

    if (isConnected) {
        return <HomePage/>;
    }

    return <ConnectPage/>;
};

export default PrivateRoute;
