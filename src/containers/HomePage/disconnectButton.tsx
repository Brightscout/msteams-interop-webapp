import React from 'react';

import {Button} from '@fluentui/react-northstar';

import {useLazyDisconnectUserQuery} from '../../services';

import {useReduxDispatch} from '../../hooks';
import {setConnected} from '../../reducers/connectedState';

const DisconnectButton = () => {
    const dispatch = useReduxDispatch();

    // Services
    const [disconnectUser, {isSuccess}] = useLazyDisconnectUserQuery();

    if (isSuccess) {
        dispatch(setConnected(false));
    }

    return (
        <div className='msteams-disconnect'>
            <Button
                content='Disconnect'
                onClick={() => disconnectUser()}
            />
        </div>
    );
};

export default DisconnectButton;
