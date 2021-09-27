import { createSlice } from "@reduxjs/toolkit";

export const inputPadSlice = createSlice({
    name: 'input',
    initialState: {
        value: 0,
        entry: '0',
        currentOperator: null,
        history: []
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setEntry: (state, action) => {
            state.entry = action.payload;
        },
        setCurrentOperator: (state, action) => {
            state.currentOperator = action.payload;
        },
        setHistory: (state, action) => {
            state.history = action.payload;
        }
    }
});

export const { setValue, setEntry, setCurrentOperator, setHistory } = inputPadSlice.actions;

export default inputPadSlice.reducer;