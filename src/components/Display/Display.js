import React from 'react';
import { useSelector } from 'react-redux';

import './Display.css';

const Display = () => {
    const currentValue = useSelector((state) => state.inputPad.value);
    const currentEntry = useSelector((state) => state.inputPad.entry);
    const currentOperator = useSelector((state) => state.inputPad.currentOperator);
    return(
        <table className='displayTable'>
            <tbody>
                <tr className='valueRow'>
                    <td className='placeholder'/>
                    <td className='operatorSpacingColumn'/>
                    <td className='valueColumn'>
                        {currentValue}
                    </td>
                    <td className='placeholder'/>
                </tr>
                <tr className='operatorAndEntryRow'>
                    <td className='placeholder'/>
                    <td className='operatorColumn'>
                        {currentOperator}
                    </td>
                    <td className='entryColumn'>
                        {currentEntry}
                    </td>
                    <td className='placeholder'/>
                </tr>
            </tbody>
        </table>
    );
}

export default Display;