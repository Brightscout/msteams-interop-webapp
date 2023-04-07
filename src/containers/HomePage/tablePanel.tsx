import React, {useEffect, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import {Button, Dialog, Loader, Table} from '@fluentui/react-northstar';

import ResultPanel from '../../components/resultPanel';
import {ERROR} from '../../constants';
import SVGIcons from '../../constants/icons';
import {useDisconnectChannelMutation, useGetConnectedChannelsQuery} from '../../services';
import {APIError, ConnectedChannelTableData} from '../../types';

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
    const {data, isError, error, isFetching} = useGetConnectedChannelsQuery();
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

        if (isFetching) {
            return (
                <Loader
                    inline={true}
                    className='margin-left-140'
                />
            );
        }

        return 'No Channel Connected';
    };

    useEffect(() => {
        if (isError || isFetching || !data?.length) {
            setRowsData([{
                key: 0,
                items: [
                    {content: <div className='msteams-home__table-no-content margin-left-300'>{getEmptyTableContent()}</div>},
                ],
            }]);
        } else if (data) {
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
                                            className='margin-left-15'
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
    }, [data, isError, isFetching, disconnectChannelIsLoading]);

    useEffect(() => {
        if (disconnectChannelIsSuccess || disconnectChannelIsError) {
            setSubsriptionDeletedId('');
            setShowResultPanel(true);
        }
    }, [disconnectChannelIsSuccess, disconnectChannelIsError]);

    return (
        <div className='msteams-home'>
            <div className='msteams-home__table margin-top-70'>
                <div className='msteams-home__table-title margin-left-10 margin-bottom-20'>{'Connected Channel List'}</div>
                <Table
                    header={header}
                    rows={rowsData}
                />
            </div>
            {showResultPanel && (
                <Dialog
                    content={
                        <ResultPanel
                            message={disconnectChannelIsSuccess ? 'Channel Disconnected Successfully' : ((disconnectChannelError as FetchBaseQueryError).data as APIError | undefined)?.message ?? ERROR.GENERIC_ERROR}
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
