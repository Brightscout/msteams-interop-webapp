import React, {useEffect, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import {Button, Dialog, Loader, Table} from '@fluentui/react-northstar';

import ResultPanel from '../../components/resultPanel';
import {GenericError} from '../../constants';
import SVGIcons from '../../constants/icons';
import {useDisconnectChannelMutation, useGetConnectedChannelsQuery} from '../../services';

const TablePanel = () => {
    // States
    const [rowsData, setRowsData] = useState<ConnectedChannelTableData[]>([]);
    const [showResultPanel, setShowResultPanel] = useState(false);
    const [subsriptionDeletedId, setSubsriptionDeletedId] = useState('');

    // Table headers
    const header = {
        items: ['MS Teams Channel', 'Mattermost Channel', 'Action'],
    };

    // Services
    const {isLoading, data, isError, error, isFetching} = useGetConnectedChannelsQuery();
    const [disconnectChannel, {
        isError: disconnectChannelIsError,
        isSuccess: disconnectChannelIsSuccess,
        isLoading: disconnectChannelIsLoading,
        error: disconnectChannelError}] = useDisconnectChannelMutation();

    const handleDisconnectButton = (subscriptionId: string) => {
        setSubsriptionDeletedId(subscriptionId);
        disconnectChannel({subscriptionId});
    };

    const getEmptyTableContent = () => {
        if (isError) {
            return ((error as FetchBaseQueryError).data as APIError | undefined)?.message;
        }

        if (isLoading || isFetching) {
            return (
                <Loader
                    inline={true}
                    className='msteams-home__table-loader'
                />
            );
        }

        return 'No Channel Connected';
    };

    useEffect(() => {
        if (isError || isLoading || isFetching || !data?.length) {
            setRowsData([{
                key: 0,
                items: [
                    {content: <div className='msteams-home__table-no-content'>{getEmptyTableContent()}</div>},
                ],
            }]);
            return;
        }

        if (data) {
            const rows: ConnectedChannelTableData[] = [];
            data.map((row, index) => {
                rows.push({
                    key: index,
                    items: [
                        {
                            content: row.teamsTeamName + '/' + row.teamsChannelName,
                        },
                        {
                            content: row.mmTeamName + '/' + row.mmChannelName,
                        },
                        {
                            content: (
                                <>
                                    <Button
                                        secondary={true}
                                        content='Disconnect'
                                        onClick={() => handleDisconnectButton(row.subscriptionId)}
                                        disabled={disconnectChannelIsLoading && subsriptionDeletedId === row.subscriptionId}
                                    />
                                    {disconnectChannelIsLoading && subsriptionDeletedId === row.subscriptionId && (
                                        <Loader
                                            inline={true}
                                            className='msteams-home__disconnect-loader'
                                        />
                                    )}
                                </>
                            ),
                        },
                    ],
                });
                return rows;
            });

            setRowsData(rows);
        }
    }, [data, isLoading, isError, isFetching, disconnectChannelIsLoading]);

    useEffect(() => {
        if (disconnectChannelIsSuccess || disconnectChannelIsError) {
            setSubsriptionDeletedId('');
            setShowResultPanel(true);
        }
    }, [disconnectChannelIsSuccess, disconnectChannelIsError]);

    return (
        <div className='msteams-home'>
            <div className='msteams-home__table'>
                <div className='msteams-home__table-title'>{'Connected Channel List'}</div>
                <Table
                    header={header}
                    rows={rowsData}
                />
            </div>
            {showResultPanel && (
                <Dialog
                    content={
                        <ResultPanel
                            message={disconnectChannelIsSuccess ? 'Channel Disconnected Successfully' : ((disconnectChannelError as FetchBaseQueryError).data as APIError | undefined)?.message ?? GenericError}
                            icon={disconnectChannelIsSuccess ? SVGIcons.success : SVGIcons.error}
                        />
                    }
                    cancelButton='Close'
                    onCancel={() => setShowResultPanel(false)}
                    confirmButton={disconnectChannelIsError && 'Try Again'}
                    onConfirm={() => setShowResultPanel(false)}
                    backdrop={true}
                    open={showResultPanel}
                />
            )}
        </div>
    );
};

export default TablePanel;
