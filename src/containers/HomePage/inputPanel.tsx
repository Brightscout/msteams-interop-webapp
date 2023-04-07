import React, {useEffect, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import {Button, Dialog, Input, Loader} from '@fluentui/react-northstar';

import ResultPanel from '../../components/resultPanel';
import {ERROR} from '../../constants';
import SVGIcons from '../../constants/icons';
import {useConnectChannelMutation} from '../../services';

import {APIError, ConnectFormFields, ConnectFormFieldsType} from '../../types';

const InputPanel = () => {
    const [showResultPanel, setShowResultPanel] = useState(false);
    const connectFormData: Record<ConnectFormFieldsType, FormConfig> = {
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

    const [connectForm, setConnectForm] = useState<Record<ConnectFormFieldsType, FormConfig>>({...connectFormData});

    // Services
    const [connectChannel, {isError, isSuccess, isLoading, error}] = useConnectChannelMutation();

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
            connectChannel({
                mmChannelUrl: connectForm.mattermostChannelURL.value,
                teamsChannelUrl: connectForm.teamsChannelUrl.value,
            });
        }
    };

    useEffect(() => {
        if (isSuccess || isError) {
            setShowResultPanel(true);
        }
    }, [isSuccess, isError]);

    return (
        <div className='msteams-home margin-left-150'>
            <div className='msteams-home__title margin-top-25'>{'Mattermost Connect'}</div>
            <div className='margin-top-35'>
                <Input
                    placeholder={connectForm.teamsChannelUrl.placeholder}
                    label={connectForm.teamsChannelUrl.label}
                    className='margin-right-15'
                    required={connectForm.teamsChannelUrl.isRequired}
                    error={connectForm.teamsChannelUrl.error as boolean}
                    onChange={handleTeamsChannelUrlChange}
                    disabled={isLoading}
                />
                <Input
                    placeholder={connectForm.mattermostChannelURL.placeholder}
                    label={connectForm.mattermostChannelURL.label}
                    className='margin-right-15'
                    required={connectForm.mattermostChannelURL.isRequired}
                    error={connectForm.mattermostChannelURL.error as boolean}
                    onChange={handleMattermostChannelUrlChange}
                    disabled={isLoading}
                />
                <Button
                    primary={true}
                    content='Connect a channel'
                    className='margin-top-20 margin-left-190'
                    onClick={handleChannelConnect}
                    disabled={isLoading}
                />
                {isLoading && (
                    <Loader
                        label='Connecting...'
                        inline={true}
                    />
                )}
                {showResultPanel && (
                    <Dialog
                        content={
                            <ResultPanel
                                message={isSuccess ? 'Channel Connected Successfully' : ((error as FetchBaseQueryError).data as APIError | undefined)?.message ?? ERROR.GENERIC_ERROR}
                                icon={isSuccess ? SVGIcons.success : SVGIcons.error}
                            />
                        }
                        cancelButton='Close'
                        onCancel={() => setShowResultPanel(false)}
                        confirmButton={isError && 'Try Again'}
                        onConfirm={() => setShowResultPanel(false)}
                        backdrop={true}
                        open={showResultPanel}
                    />
                )}
            </div>
        </div>
    );
};

export default InputPanel;
