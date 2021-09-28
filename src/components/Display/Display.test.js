import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import inputPadReducer from '../InputPad/InputPadSlice';

import App from '../../App';
import Display from './Display';

describe('Display', () => {
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
                <Display />
            </Provider>
        );
        expect((await screen.findAllByText('0')).length).toEqual(2);
    });
    it('updates the display of the current entry when the user clicks a number button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const oneButton = await screen.findByText('1');

        fireEvent.click(oneButton);

        // must account for the numbers on the buttons, too
        expect((await screen.findAllByText('1')).length).toEqual(2);
    });
    it('updates the display of the current total value and resets the current entry to 0 when the user clicks an operation button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const oneButton = await screen.findByText('1');
        const addButton = await screen.findByText('+');

        fireEvent.click(oneButton);
        fireEvent.click(addButton);

        // must account for the numbers on the buttons, too
        expect((await screen.findAllByText('1')).length).toEqual(2);
        expect((await screen.findAllByText('0')).length).toEqual(2);
    });
});