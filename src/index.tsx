import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {teamsTheme, Provider as FluentProvider} from '@fluentui/react-northstar';

// TODO: Set path alias like @Reducers/..., @Components/..., @Hooks/...,
import App from './app';

import {store} from './store';

ReactDOM.render(
    <Provider
        store={store}
    >
        <FluentProvider
            theme={teamsTheme}
        >
            <App/>
        </FluentProvider>
    </Provider>,
    document.getElementById('root'),
);
