import React from 'react';
import Display from './components/Display/Display';
import InputPad from './components/InputPad/InputPad';
import History from './components/History/History'
import './App.css';

function App() {
  return (
    <div className="App">
      <table className="calculatorContainer">
        <tbody>
          <tr className="displayRow">
            <td className="padding" />
            <td className="displayColumn">
              <Display className="display"/>
            </td>
            <td className="padding" />
          </tr>
          <tr className="inputPadRow">
            <td className="padding" />
            <td className="inputPadColumn">
              <InputPad className="inputPad"/>
            </td>
            <td className="padding" />
          </tr>
        </tbody>
      </table>
      <div className="historyContainer">
        <History className="history"/>
      </div>
    </div>
  );
}

export default App;
