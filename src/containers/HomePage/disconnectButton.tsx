import React, {memo, useEffect} from 'react';

import {Button} from '@fluentui/react-northstar';

import {useLazyDisconnectUserQuery} from '../../services';

import {useReduxDispatch} from '../../hooks';
import {setConnected} from '../../reducers/connectedState';

export function DisconnectButton() {
    const dispatch = useReduxDispatch();

    // Services
    const [disconnectUser, {isSuccess}] = useLazyDisconnectUserQuery();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setConnected(false));
        }
    }, [isSuccess]);

    return (
        <div className='msteams-home__disconnect-button'>
            <Button
                content='Disconnect'
                onClick={() => disconnectUser()}
            />
        </div>
    );
}

export const MemoizedDisconnectButton = memo(DisconnectButton);
