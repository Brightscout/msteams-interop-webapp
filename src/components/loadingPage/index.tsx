import React from 'react';

import {Loader} from '@fluentui/react-northstar';

const LoadingPage = () => (
    <div className='msteams-loading-page'>
        <Loader
            label='Loading...'
            inline={true}
        />
    </div>
);

export default LoadingPage;
