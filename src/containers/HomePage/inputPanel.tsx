import React, {useState} from 'react';

import {Button, Input} from '@fluentui/react-northstar';

import {ConnectFormFields} from '../../types';

const InputPanel = () => {
    const connectFormData: Record<ConnectFormFields, FormConfig> = {
        [ConnectFormFields.teamsChannelUrl]: {
            label: 'Teams channel URL',
            placeholder: 'URL',
            isRequired: true,
        },
        [ConnectFormFields.mattermostChannelURL]: {
            label: 'Mattermost channel URL',
            placeholder: 'URL',
            isRequired: true,
        },
    };

    const [connectForm, setConnectForm] = useState<Record<ConnectFormFields, FormConfig>>({...connectFormData});

    const handleTeamsChannelUrlChange = (e: React.SyntheticEvent) => {
        setConnectForm({
            ...connectForm,
            teamsChannelUrl: {
                ...connectForm.teamsChannelUrl,
                error: false,
                value: (e.target as HTMLInputElement).value,
            }});
    };

    const handleMattermostChannelUrlChange = (e: React.SyntheticEvent) => {
        setConnectForm({
            ...connectForm,
            mattermostChannelURL: {
                ...connectForm.mattermostChannelURL,
                error: false,
                value: (e.target as HTMLInputElement).value,
            }});
    };

    const handleChannelConnect = () => {
        if (!connectForm.teamsChannelUrl.value) {
            setConnectForm((formData) => ({
                ...formData,
                teamsChannelUrl: {
                    ...formData.teamsChannelUrl,
                    error: true,
                },
            }));
        }

        if (!connectForm.mattermostChannelURL.value) {
            setConnectForm((formData) => ({
                ...formData,
                mattermostChannelURL: {
                    ...formData.mattermostChannelURL,
                    error: true,
                },
            }));
        }

        if (connectForm.teamsChannelUrl.value && connectForm.mattermostChannelURL.value) {
            // TODO: remove later
            // eslint-disable-next-line no-alert
            alert(connectForm.teamsChannelUrl.value + ' ' + connectForm.mattermostChannelURL.value);
        }
    };

    return (
        <div className='msteams-home'>
            <div className='msteams-home__title'>{'Mattermost Connect'}</div>
            <div className='msteams-home__input-panel'>
                <Input
                    placeholder={connectForm.teamsChannelUrl.placeholder}
                    label={connectForm.teamsChannelUrl.label}
                    className='msteams-home__input-component'
                    required={connectForm.teamsChannelUrl.isRequired}
                    error={connectForm.teamsChannelUrl.error as boolean}
                    onChange={handleTeamsChannelUrlChange}
                />
                <Input
                    placeholder={connectForm.mattermostChannelURL.placeholder}
                    label={connectForm.mattermostChannelURL.label}
                    className='msteams-home__input-component'
                    required={connectForm.mattermostChannelURL.isRequired}
                    error={connectForm.mattermostChannelURL.error as boolean}
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
