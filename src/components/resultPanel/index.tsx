import React from 'react';

type ResultPanelProps = {
    message: string;
    icon?: JSX.Element;
}

const ResultPanel = ({message, icon}: ResultPanelProps) => (
    <div className='msteams-panel'>
        <div className='msteams-panel__icon'>
            {icon}
        </div>
        <div className='msteams-panel__text'>
            {message}
        </div>
    </div>
);

export default ResultPanel;
