import React, {useEffect, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import {Button, Dialog, Loader, Table} from '@fluentui/react-northstar';

import LoadingPage from '../../components/loadingPage';
import ResultPanel from '../../components/resultPanel';
import {ERROR} from '../../constants';
import SVGIcons from '../../constants/icons';
import {useDisconnectChannelMutation, useGetConnectedChannelsQuery} from '../../services';
import {APIError, ConnectedChannelTableData} from '../../types';

const TablePanel = () => {
    // States
    const [rowsData, setRowsData] = useState<ConnectedChannelTableData[]>([]);
    const [showResultPanel, setShowResultPanel] = useState(false);
    const [deletedSubsriptionId, setDeletedSubsriptionId] = useState('');

    // Table headers
    const header = {
        items: ['MS Teams Channel', 'Mattermost Channel', 'Action'],
    };

    // Services
    const {data, isError, error, isFetching} = useGetConnectedChannelsQuery();
    const [disconnectChannel, {
        isError: isDisconnectChannelError,
        isSuccess: isDisconnectChannelSuccess,
        isLoading: isDisconnectChannelLoading,
        error: disconnectChannelError}] = useDisconnectChannelMutation();

    const handleDisconnectButton = (subscriptionId: string) => {
        setDeletedSubsriptionId(subscriptionId);
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
                                        disabled={isDisconnectChannelLoading && deletedSubsriptionId === row.subscriptionId}
                                    />
                                    {isDisconnectChannelLoading && deletedSubsriptionId === row.subscriptionId && (
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
    }, [data, isError, isFetching, isDisconnectChannelLoading]);

    useEffect(() => {
        if (isDisconnectChannelSuccess || isDisconnectChannelError) {
            setDeletedSubsriptionId('');
            setShowResultPanel(true);
        }
    }, [isDisconnectChannelSuccess, isDisconnectChannelError]);

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
                            message={isDisconnectChannelSuccess ? 'Channel Disconnected Successfully' : ((disconnectChannelError as FetchBaseQueryError).data as APIError | undefined)?.message ?? ERROR.GENERIC_ERROR}
                            icon={isDisconnectChannelSuccess ? SVGIcons.success : SVGIcons.error}
                        />
                    }
                    cancelButton='Close'
                    onCancel={() => setShowResultPanel(false)}
                    confirmButton={isDisconnectChannelError && 'Try Again'}
                    onConfirm={() => setShowResultPanel(false)}
                    backdrop={true}
                    open={showResultPanel}
                />
            )}
            {isDisconnectChannelLoading && (
                <LoadingPage
                    label='Disconnecting...'
                    inline={true}
                    className='msteams-loading-page__transparent-loader'
                />
            )}
        </div>
    );
};

export default TablePanel;
