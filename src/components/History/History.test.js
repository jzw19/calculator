import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import inputPadReducer from '../InputPad/InputPadSlice';

import App from '../../App';
import History from './History';

describe('History', () => {
    let store = null;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                inputPad: inputPadReducer
            }
        })
    });

    it('renders with all expected visible text', async () => {
        rtlRender(
            <Provider store={store}>
                <History />
            </Provider>
        );
        expect(await screen.findByText('Clear History')).toBeVisible();
    });
    it('prints the history of values where the user pressed the equals button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const equalsButton = await screen.findByText('=');
        const addButton = await screen.findByText('+');
        const oneButton = await screen.findByText('1');

        fireEvent.click(addButton);
        fireEvent.click(oneButton);
        fireEvent.click(equalsButton);
        fireEvent.click(addButton);
        fireEvent.click(oneButton);
        fireEvent.click(equalsButton);

        // must account for the numbers in the display and on the buttons, too
        expect((await screen.findAllByText('1')).length).toEqual(2);
        expect((await screen.findAllByText('2')).length).toEqual(3);
    });
    it('clears only the history when the user clicks the clear history button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const equalsButton = await screen.findByText('=');
        const addButton = await screen.findByText('+');
        const oneButton = await screen.findByText('1');
        const clearHistoryButton = await screen.findByText('Clear History');

        fireEvent.click(addButton);
        fireEvent.click(oneButton);
        fireEvent.click(equalsButton);
        fireEvent.click(clearHistoryButton);

        expect((await screen.findAllByText('1')).length).toEqual(2);
    });
});