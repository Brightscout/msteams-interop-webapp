import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {teamsTheme, Provider as FluentProvider} from '@fluentui/react-northstar';

// TODO: Set path alias like @Reducers/..., @Components/..., @Hooks/...,
import PrivateRoute from './routes/privateRoute';

import {store} from './store';

import './styles/main.scss';

ReactDOM.render(
    <Provider
        store={store}
    >
        <FluentProvider
            theme={teamsTheme}
        >
            <PrivateRoute/>
        </FluentProvider>
    </Provider>,
    document.getElementById('root'),
);
