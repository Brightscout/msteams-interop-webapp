import React from 'react';

import DisconnectButton from '../../components/disconnectButton';

import InputPanel from './inputPanel';
import TablePanel from './tablePanel';

const HomePage = () => (
    <>
        <DisconnectButton/>
        <InputPanel/>
        <TablePanel/>
    </>
);

export default HomePage;
