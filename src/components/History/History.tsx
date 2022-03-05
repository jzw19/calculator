import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setHistory } from '../InputPad/InputPadSlice';

import './History.css';

const History = () => {
    const history = useSelector<RootStateOrAny, Array<string>>((state) => state.inputPad.history);
    const dispatch = useDispatch();

    const printHistory = () => {
        const formattedHistory = [];
        for(let index = 0; index < history.length; index++) {
            formattedHistory.push(
                <div className='historyEntry' key={`entry-${index}`}>
                    <span>{history[index]}</span>
                    <br/>
                </div>
            );
        }
        return formattedHistory;
    }

    const clearHistory = () => {
        dispatch(setHistory([]));
    }

    return(
        <div className='historyEntriesContainer'>
            <button className='clearHistoryButton' onClick={clearHistory}>
                Clear History
            </button>
            {printHistory()}
        </div>
    )
}

export default History;