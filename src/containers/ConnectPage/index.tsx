import React, {useEffect} from 'react';

import {Button} from '@fluentui/react-northstar';

import LoadingPage from '../../components/loadingPage';
import {CONNECT_ACCOUNT_LINK, PLUGIN_ID} from '../../constants';
import {useReduxDispatch} from '../../hooks';
import {setConnected} from '../../reducers/connectedState';
import {useLazyGetConnectedChannelsQuery} from '../../services';

const ConnectPage = () => {
    const dispatch = useReduxDispatch();

    const [getConnectedChannels, {isLoading, isSuccess, isFetching}] = useLazyGetConnectedChannelsQuery();

    useEffect(() => {
        if (isSuccess && !(isLoading || isFetching)) {
            dispatch(setConnected(true));
        }
    }, [isSuccess, isLoading, isFetching]);

    if (isLoading || isFetching) {
        return (
            <LoadingPage/>
        );
    }

    return (
        <div className='msteams-connect'>
            <div className='msteams-connect__title'>{'Connect your account'}</div>
            <div className='msteams-connect__description'>{'Authorize your Microsoft Teams account and broadcast your messages from Microsoft Teams to Mattermost.'}</div>
            <a

                // TODO: update the url from configuration page
                href={`https://e9ae-2405-201-402b-6c0f-7b88-9e95-c1e5-7203.in.ngrok.io/plugins/${PLUGIN_ID}/api/v1/teams${CONNECT_ACCOUNT_LINK}`}
                target='_blank'
                className='msteams-connect__button'
                rel='noreferrer'
            >
                {'Connect Now'}
            </a>
            <Button
                primary={true}
                content='Already connected? Go to home'
                className='msteams-connect__home-button'
                onClick={() => getConnectedChannels()}
            />
        </div>
    );
};

export default ConnectPage;
