import React from 'react';

import {Button} from '@fluentui/react-northstar';

import {CONNECT_ACCOUNT_LINK, PLUGIN_ID} from '../../constants';

const ConnectPage = () => {
    return (
        <div className='msteams-connect'>
            <div className='msteams-connect__title'>{'Connect your account'}</div>
            <div className='msteams-connect__description'>{'Authorize your Microsoft Teams account and broadcast your messages from Microsoft Teams to Mattermost.'}</div>
            <a

                // TODO: update the url from configuration page
                href={`https://e3c2-2405-201-402b-6c0f-9136-66-e463-7ab5.in.ngrok.io/plugins/${PLUGIN_ID}/api/v1/teams${CONNECT_ACCOUNT_LINK}`}
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
            />
        </div>
    );
};

export default ConnectPage;
