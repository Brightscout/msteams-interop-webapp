import React, {useEffect} from 'react';

import {Button} from '@fluentui/react-northstar';

import {PLUGIN_API} from '../../constants';
import LoadingPage from '../../components/loadingPage';
import {useReduxDispatch} from '../../hooks';
import {setConnected} from '../../reducers/connectedState';
import {useLazyGetConnectedChannelsQuery} from '../../services';

import utils from '../../utils';

import './styles.scss';

const ConnectPage = () => {
    const dispatch = useReduxDispatch();

    const [getConnectedChannels, {isSuccess, isFetching}] = useLazyGetConnectedChannelsQuery();

    useEffect(() => {
        if (isSuccess && !isFetching) {
            dispatch(setConnected(true));
        }
    }, [isSuccess, isFetching]);

    if (isFetching) {
        return <LoadingPage/>;
    }

    return (
        <div className='msteams-connect'>
            <div className='msteams-connect__title'>{'Connect your account'}</div>
            <div className='msteams-connect__description'>{'Authorize your Microsoft Teams account and broadcast your messages from Microsoft Teams to Mattermost.'}</div>
            <a
                href={`${utils.getBaseUrls().plugin}${PLUGIN_API.CONNECT_ACCOUNT_LINK}`}
                target='_blank'
                className='msteams-connect__button d-flex flex-row'
                rel='noreferrer'
            >
                {'Connect Now'}
            </a>
            <Button
                primary={true}
                content='Already connected? Go to home'
                className='margin-left-25'
                onClick={() => getConnectedChannels()}
            />
        </div>
    );
};

export default ConnectPage;
