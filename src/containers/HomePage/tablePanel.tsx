import React, {useEffect, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import {Button, Loader, Table} from '@fluentui/react-northstar';

import {APIError, ConnectedChannelTableData} from '../../types';

import {useGetConnectedChannelsQuery} from '../../services';

const TablePanel = () => {
    // States
    const [rowsData, setRowsData] = useState<ConnectedChannelTableData[]>([]);

    // Table headers
    const header = {
        items: ['MS Teams Channel', 'Mattermost Channel', 'Action'],
    };

    // Services
    const {isLoading, data, isError, error, isFetching} = useGetConnectedChannelsQuery();

    const handleDisconnectButton = (teamsChannel: string, mmChannel: string) => {
        // TODO: complete this function
        // eslint-disable-next-line no-alert
        alert('clicked disconnect button ' + teamsChannel + ' ' + mmChannel);
    };

    const getEmptyTableContent = () => {
        if (isError) {
            return ((error as FetchBaseQueryError).data as APIError | undefined)?.message;
        }

        if (isLoading || isFetching) {
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
        if (isError || isLoading || isFetching || !data?.length) {
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
                            content: row.TeamsTeamName + '/' + row.TeamsChannelName,
                        },
                        {
                            content: row.MMTeamName + '/' + row.MMChannelName,
                        },
                        {
                            content: (
                                <Button
                                    secondary={true}
                                    content='Disconnect'
                                    onClick={() => handleDisconnectButton(row.TeamsChannelName, row.MMChannelName)}
                                />
                            ),
                        },
                    ],
                });
                return rows;
            });

            setRowsData(rows);
        }
    }, [data, isLoading, isError, isFetching]);

    return (
        <div className='msteams-home'>
            <div className='msteams-home__table margin-top-70'>
                <div className='msteams-home__table-title margin-left-10 margin-bottom-20'>{'Connected Channel List'}</div>
                <Table
                    header={header}
                    rows={rowsData}
                />
            </div>
        </div>
    );
};

export default TablePanel;
