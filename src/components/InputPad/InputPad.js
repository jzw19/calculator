import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, setEntry, setCurrentOperator, setHistory } from './InputPadSlice';

import './InputPad.css';

const InputPad = () => {
    const currentValue = useSelector((state) => state.inputPad.value);
    const currentEntry = useSelector((state) => state.inputPad.entry);
    const currentOperator = useSelector((state) => state.inputPad.currentOperator);
    const currentHistory = useSelector((state) => state.inputPad.history);
    const dispatch = useDispatch();

    const clearAll = () => {
        dispatch(setValue(0));
        dispatch(setEntry('0'));
        dispatch(setCurrentOperator(null));
    }

    const setCurrentEntry = (event) => {
        if(
            currentEntry === null
            || currentEntry === undefined
            || event.target.value === 'ce'
            || (currentEntry === '0' && event.target.value === '0')
        ) {
            dispatch(setEntry('0'));
        } else if(currentEntry === '0') {
            dispatch(setEntry(event.target.value));
        } else {
            dispatch(setEntry(currentEntry + event.target.value));
        }
    }

    const updateValueAndResetEntry = (updatedValue) => {
        dispatch(setValue(updatedValue));
        dispatch(setEntry('0'));
    }

    const clickOperationButton = (event) => {
        const correctionFactor = 10000;
        if(!currentOperator) {
            updateValueAndResetEntry(Number.parseFloat(currentEntry));
            dispatch(setCurrentOperator(event.target.value));
        } else {
            let nextValue = 0;
            switch(currentOperator) {
                case '+':
                    nextValue = ((currentValue * correctionFactor) + (Number.parseFloat(currentEntry) * correctionFactor)) / correctionFactor;
                    updateValueAndResetEntry(nextValue);
                    break;
                case '-':
                    nextValue = ((currentValue * correctionFactor) - (Number.parseFloat(currentEntry) * correctionFactor)) / correctionFactor;
                    updateValueAndResetEntry(nextValue);
                    break;
                case '*':
                    nextValue = ((currentValue * correctionFactor) * (Number.parseFloat(currentEntry) * correctionFactor)) / correctionFactor / correctionFactor;
                    updateValueAndResetEntry(nextValue);
                    break;
                case '/':
                    nextValue = ((currentValue * correctionFactor) / (Number.parseFloat(currentEntry) * correctionFactor));
                    updateValueAndResetEntry(nextValue);
                    break;
                case '%':
                    nextValue = ((currentValue * correctionFactor) % (Number.parseFloat(currentEntry) * correctionFactor)) / correctionFactor;
                    updateValueAndResetEntry(nextValue);
                    break;
                default:
            }

            if(event.target.value === '=') {
                dispatch(setEntry('0'));
                dispatch(setHistory([...currentHistory, nextValue]))
                if(currentOperator !== '=') {
                    dispatch(setValue(nextValue));
                    setCurrentOperator(event.target.value);
                }
            } else {
                dispatch(setCurrentOperator(event.target.value));
            }
        }
    }

    const togglePositiveNegative = () => dispatch(setEntry(Number.parseFloat(currentEntry * (-1)).toString()));

    const generateNumberButton = (num) => (<button className={`pad ${num}Button`} value={`${num}`} onClick={setCurrentEntry}>{num}</button>);

    return(
        <div className='inputPad'>
            <div className='buttonRow 0'>
                <button className='pad clearEntryButton' value='ce' onClick={setCurrentEntry}>CE</button>
                <button className='pad clearAllButton' value='c' onClick={clearAll}>C</button>
                <button className='pad plusMinusButton' value='+/-' onClick={togglePositiveNegative}>+/-</button>
                <button className='pad modulusButton' value='%' onClick={clickOperationButton}>%</button>
            </div>
            <div className='buttonRow 1'>
                {generateNumberButton(7)}
                {generateNumberButton(8)}
                {generateNumberButton(9)}
                <button className='pad divideButton' value='/' onClick={clickOperationButton}>{'\u00f7'}</button>
            </div>
            <div className='buttonRow 2'>
                {generateNumberButton(4)}
                {generateNumberButton(5)}
                {generateNumberButton(6)}
                <button className='pad multiplyButton' value='*' onClick={clickOperationButton}>x</button>
            </div>
            <div className='buttonRow 3'>
                {generateNumberButton(1)}
                {generateNumberButton(2)}
                {generateNumberButton(3)}
                <button className='pad subtractButton' value='-' onClick={clickOperationButton}>-</button>
            </div>
            <div className='buttonRow 4'>
                {generateNumberButton(0)}
                <button className='pad decimalButton' value='.' onClick={setCurrentEntry}>.</button>
                <button className='pad equalsButton' value='=' onClick={clickOperationButton}>=</button>
                <button className='pad addButton' value='+' onClick={clickOperationButton}>+</button>
            </div>
        </div>
    );
}

export default InputPad;