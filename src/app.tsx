import React from 'react';

import {Card, CardBody, Button} from '@fluentui/react-northstar';

import {useReduxDispatch, useReduxSelector} from './hooks';

import {setColor} from './reducers/testReducer';

// TODO: remove later
const App = () => {
    const color = useReduxSelector((state) => state.testReducer.color);
    const dispatch = useReduxDispatch();

    return (
        <Card styles={{background: color, ':hover': color}}>
            <CardBody>
                {color}
            </CardBody>
            <Button
                primary={true}
                content='Update'
                onClick={() => dispatch(setColor(Math.floor(Math.random() * 4)))}
            />
        </Card>
    );
};

export default App;
