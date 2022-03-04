import { RootStateOrAny, useSelector } from 'react-redux';

import './Display.css';

const Display = () => {
    const currentValue = useSelector<RootStateOrAny, string>((state) => state.inputPad.value);
    const currentEntry = useSelector<RootStateOrAny, string>((state) => state.inputPad.entry);
    const currentOperator = useSelector<RootStateOrAny, string>((state) => state.inputPad.currentOperator);
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