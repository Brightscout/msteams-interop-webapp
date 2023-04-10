import React, {useEffect} from 'react';

import {Button} from '@fluentui/react-northstar';

import LoadingPage from '../../components/loadingPage';
import {CONNECT_ACCOUNT_LINK} from '../../constants';
import {useReduxDispatch} from '../../hooks';
import {setConnected} from '../../reducers/connectedState';
import {useLazyGetConnectedChannelsQuery} from '../../services';

import utils from '../../utils';

import './styles.scss';

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
            <LoadingPage
                label='Loading...'
                inline={true}
            />
        );
    }

    return (
        <div className='msteams-connect'>
            <div className='msteams-connect__title'>{'Connect your account'}</div>
            <div className='msteams-connect__description'>{'Authorize your Microsoft Teams account and broadcast your messages from Microsoft Teams to Mattermost.'}</div>
            <a
                href={`${utils.getBaseUrls().plugin}${CONNECT_ACCOUNT_LINK}`}
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
