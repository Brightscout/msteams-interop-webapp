import React from 'react';

import {MemoizedDisconnectButton} from './disconnectButton';
import InputPanel from './inputPanel';
import TablePanel from './tablePanel';

const HomePage = () => (
    <>
        <MemoizedDisconnectButton/>
        <InputPanel/>
        <TablePanel/>
    </>
);

export default HomePage;
