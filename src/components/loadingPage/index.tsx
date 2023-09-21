import React from 'react';

import {Loader} from '@fluentui/react-northstar';

import './styles.scss';

type LoadingPageProps = {
    className?: string;
    label?: string;
    inline?: boolean;
}

const LoadingPage = ({
    className,
    inline,
    label,
}: LoadingPageProps) => (
    <div className='msteams-loading-page'>
        <Loader
            label={label}
            inline={inline}
            className={className}
        />
    </div>
);

export default LoadingPage;
