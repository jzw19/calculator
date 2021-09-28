import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

describe('App', () => {
    it('renders with all expected visible text', async () => {
        rtlRender(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect((await screen.findAllByText('0')).length).toEqual(3);
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
        expect(await screen.findByText('Clear History')).toBeVisible();
    });
});