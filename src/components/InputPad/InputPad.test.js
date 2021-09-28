import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import inputPadReducer from './InputPadSlice';

import App from '../../App';
import InputPad from './InputPad';

describe('InputPad', () => {
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
                <InputPad />
            </Provider>
        );
        expect((await screen.findAllByText('0')).length).toEqual(1);
        expect(await screen.findByText('1')).toBeVisible();
        expect(await screen.findByText('2')).toBeVisible();
        expect(await screen.findByText('3')).toBeVisible();
        expect(await screen.findByText('4')).toBeVisible();
        expect(await screen.findByText('5')).toBeVisible();
        expect(await screen.findByText('6')).toBeVisible();
        expect(await screen.findByText('7')).toBeVisible();
        expect(await screen.findByText('8')).toBeVisible();
        expect(await screen.findByText('9')).toBeVisible();
        expect(await screen.findByText('.')).toBeVisible();
        expect(await screen.findByText('%')).toBeVisible();
        expect(await screen.findByText('+')).toBeVisible();
        expect(await screen.findByText('-')).toBeVisible();
        expect(await screen.findByText('x')).toBeVisible();
        expect(await screen.findByText('\u00f7')).toBeVisible();
        expect(await screen.findByText('=')).toBeVisible();
        expect(await screen.findByText('C')).toBeVisible();
        expect(await screen.findByText('CE')).toBeVisible();
        expect(await screen.findByText('+/-')).toBeVisible();
    });
    it('updates the display of the current entry when the user clicks a number button or the decimal button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(await screen.findByText('1'));
        fireEvent.click(await screen.findByText('2'));
        fireEvent.click(await screen.findByText('3'));
        fireEvent.click(await screen.findByText('.'));
        fireEvent.click(await screen.findByText('4'));
        fireEvent.click(await screen.findByText('5'));
        fireEvent.click(await screen.findByText('6'));
        fireEvent.click(await screen.findByText('7'));
        fireEvent.click(await screen.findByText('8'));
        fireEvent.click(await screen.findByText('9'));

        expect((await screen.findAllByText('123.456789')).length).toEqual(1);
    });

    it('updates running value and clears current entry when the user presses an operator button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(await screen.findByText('8'));
        fireEvent.click(await screen.findByText('x'));
        fireEvent.click(await screen.findByText('4'));
        fireEvent.click(await screen.findByText('%'));
        expect(await screen.findByText('32')).toBeVisible();
    
        fireEvent.click(await screen.findByText('1'));
        fireEvent.click((await screen.findAllByText('1'))[1]);
        fireEvent.click(await screen.findByText('+'));
        expect(await screen.findByText('10')).toBeVisible();

        fireEvent.click(await screen.findByText('6'));
        fireEvent.click(await screen.findByText('5'));
        fireEvent.click(await screen.findByText('-'));
        expect(await screen.findByText('75')).toBeVisible();

        fireEvent.click(await screen.findByText('3'));
        fireEvent.click(await screen.findByText('\u00f7'))
        expect(await screen.findByText('72')).toBeVisible();

        fireEvent.click(await screen.findByText('6'));
        fireEvent.click(await screen.findByText('+'));
        // should update display value and insert entry into history
        expect(await screen.findByText('12')).toBeVisible();
    });
    it('updates the running value and inserts the value into history when the user clicks the equals button', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(await screen.findByText('1'));
        fireEvent.click(await screen.findByText('2'));
        fireEvent.click(await screen.findByText('+'));
        fireEvent.click(await screen.findByText('3'));
        fireEvent.click(await screen.findByText('='));

        expect((await screen.findAllByText('15')).length).toEqual(2);
    });
    it('clears the current entry when the clear entry button is clicked', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(await screen.findByText('1'));
        fireEvent.click(await screen.findByText('2'));
        fireEvent.click(await screen.findByText('+'));
        fireEvent.click(await screen.findByText('3'));
        fireEvent.click(await screen.findByText('='));
        fireEvent.click(await screen.findByText('CE'));

        expect((await screen.findAllByText('15')).length).toEqual(2);
        expect((await screen.findAllByText('0')).length).toEqual(2);
    });
    it('clears the current entry and the running value when the clear button is clicked', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(await screen.findByText('1'));
        fireEvent.click(await screen.findByText('2'));
        fireEvent.click(await screen.findByText('+'));
        fireEvent.click(await screen.findByText('3'));
        fireEvent.click(await screen.findByText('='));
        fireEvent.click(await screen.findByText('C'));

        expect((await screen.findAllByText('15')).length).toEqual(1);
        expect((await screen.findAllByText('0')).length).toEqual(3);
    });
});