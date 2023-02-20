import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {teamsTheme, Provider as FluentProvider} from '@fluentui/react-northstar';

// TODO: Set path alias like @Reducers/..., @Components/..., @Hooks/...,
import HomePage from './containers/HomePage';

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
            <HomePage/>
        </FluentProvider>
    </Provider>,
    document.getElementById('root'),
);
