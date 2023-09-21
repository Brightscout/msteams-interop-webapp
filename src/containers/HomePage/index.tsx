import React from 'react';

import {MemoizedDisconnectButton} from './disconnectButton';
import InputPanel from './inputPanel';
import TablePanel from './tablePanel';

import './styles.scss';

const HomePage = () => (
    <>
        <MemoizedDisconnectButton/>
        <InputPanel/>
        <TablePanel/>
    </>
);

export default HomePage;
