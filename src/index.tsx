import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {teamsTheme, Provider as FluentProvider} from '@fluentui/react-northstar';

// TODO: Set path alias like @Reducers/..., @Components/..., @Hooks/...,
import ConnectPage from './containers/ConnectPage';

import {store} from './store';

import './styles/main.scss';

ReactDOM.render(
    <Provider
        store={store}
    >
        <FluentProvider
            theme={teamsTheme}
        >
            {/* TODO: change this component later */}
            <ConnectPage/>
        </FluentProvider>
    </Provider>,
    document.getElementById('root'),
);
