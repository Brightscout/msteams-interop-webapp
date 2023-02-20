import React, {useState} from 'react';

import {Button, Input} from '@fluentui/react-northstar';

const InputPanel = () => {
    const [teamsChannelUrl, setTeamsChannelUrl] = useState('');
    const [mattermostChannelUrl, setMattermostChannelUrl] = useState('');

    // Error states
    const [teamsChannelUrlError, setTeamsChannelUrlError] = useState(false);
    const [mattermostChannelUrlError, setMattermostChannelUrlError] = useState(false);

    const handleTeamsChannelUrlChange = (e: React.SyntheticEvent) => {
        setTeamsChannelUrlError(false);
        setTeamsChannelUrl((e.target as HTMLInputElement).value);
    };

    const handleMattermostChannelUrlChange = (e: React.SyntheticEvent) => {
        setMattermostChannelUrlError(false);
        setMattermostChannelUrl((e.target as HTMLInputElement).value);
    };

    const handleChannelConnect = () => {
        if (!teamsChannelUrl) {
            setTeamsChannelUrlError(true);
        }

        if (!mattermostChannelUrl) {
            setMattermostChannelUrlError(true);
        }

        if (teamsChannelUrl && mattermostChannelUrl) {
            // TODO: remove later
            // eslint-disable-next-line no-alert
            alert(teamsChannelUrl + ' ' + mattermostChannelUrl);
        }
    };

    return (
        <div className='msteams-home'>
            <div className='msteams-home__title'>{'Mattermost Connect'}</div>
            <div className='msteams-home__input-panel'>
                <Input
                    placeholder='URL'
                    label='Teams channel URL'
                    className='msteams-home__input-component'
                    required={true}
                    error={teamsChannelUrlError}
                    onChange={handleTeamsChannelUrlChange}
                />
                <Input
                    placeholder='URL'
                    label='Mattermost channel URL'
                    className='msteams-home__input-component'
                    required={true}
                    error={mattermostChannelUrlError}
                    onChange={handleMattermostChannelUrlChange}
                />
                <Button
                    primary={true}
                    content='Connect a channel'
                    className='msteams-home__input-button'
                    onClick={handleChannelConnect}
                />
            </div>
        </div>
    );
};

export default InputPanel;
