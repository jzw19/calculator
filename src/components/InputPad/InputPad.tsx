import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setValue, setEntry, setCurrentOperator, setHistory } from './InputPadSlice';

import './InputPad.css';
import React from 'react';

const InputPad = () => {
    const currentValue = useSelector<RootStateOrAny, number>((state) => state.inputPad.value);
    const currentEntry = useSelector<RootStateOrAny, string>((state) => state.inputPad.entry);
    const currentOperator = useSelector<RootStateOrAny, string | null>((state) => state.inputPad.currentOperator);
    const currentHistory = useSelector<RootStateOrAny, Array<string>>((state) => state.inputPad.history);
    const dispatch = useDispatch();

    const clearAll = () => {
        dispatch(setValue(0));
        dispatch(setEntry('0'));
        dispatch(setCurrentOperator(null));
    }

    const setCurrentEntry = (event : React.MouseEvent<HTMLButtonElement>) => {
        if(
            currentEntry === null
            || currentEntry === undefined
            || event.currentTarget.value === 'ce'
            || (currentEntry === '0' && event.currentTarget.value === '0')
        ) {
            dispatch(setEntry('0'));
        } else if(currentEntry === '0') {
            dispatch(setEntry(event.currentTarget.value));
        } else {
            dispatch(setEntry(currentEntry + event.currentTarget.value));
        }
    }

    const updateValueAndResetEntry = (updatedValue : number) => {
        dispatch(setValue(updatedValue));
        dispatch(setEntry('0'));
    }

    const clickOperationButton = (event : React.MouseEvent<HTMLButtonElement>) => {
        const correctionFactor = 10000;
        if(!currentOperator) {
            updateValueAndResetEntry(Number.parseFloat(currentEntry));
            dispatch(setCurrentOperator(event.currentTarget.value));
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

            // TODO: Need to fix equals button and operation sequences
            if(event.currentTarget.value === '=') {
                dispatch(setEntry('0'));
                dispatch(setHistory([...currentHistory, nextValue]))
                if(currentOperator !== '=') {
                    dispatch(setValue(nextValue));
                }
                setCurrentOperator(event.currentTarget.value);
            } else {
                dispatch(setCurrentOperator(event.currentTarget.value));
            }
        }
    }

    const togglePositiveNegative = () => dispatch(setEntry((Number.parseFloat(currentEntry) * (-1)).toString()));

    const generateNumberButton = (num : number) => (<button className={`pad ${num}Button`} value={`${num}`} onClick={setCurrentEntry}>{num}</button>);

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