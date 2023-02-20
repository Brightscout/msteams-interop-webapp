// TODO: remove later
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TestReducer = {
    color: 'white',
};

const colors = ['red', 'blue', 'orange', 'yellow'];

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setColor: (state, action: PayloadAction<number>) => {
            state.color = colors[action.payload];
        },
    },
});

export const {setColor} = testSlice.actions;

export default testSlice.reducer;
