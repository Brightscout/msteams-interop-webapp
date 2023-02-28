import React from 'react';

import DisconnectButton from './disconnectButton';
import InputPanel from './inputPanel';
import TablePanel from './tablePanel';

import './styles.scss';

const HomePage = () => (
    <>
        <DisconnectButton/>
        <InputPanel/>
        <TablePanel/>
    </>
);

export default HomePage;
