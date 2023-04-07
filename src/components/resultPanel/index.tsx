import React from 'react';

type ResultPanelProps = {
    message: string;
    icon?: JSX.Element;
}

const ResultPanel = ({message, icon}: ResultPanelProps) => (
    <div className='d-flex flex-column'>
        <div className='margin-auto margin-bottom-10'>
            {icon}
        </div>
        <div className='margin-auto margin-top-10'>
            {message}
        </div>
    </div>
);

export default ResultPanel;
