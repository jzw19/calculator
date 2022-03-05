import Display from './components/Display';
import InputPad from './components/InputPad';
import History from './components/History';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <table className="calculatorContainer">
        <tbody>
          <tr className="displayRow">
            <td className="padding" />
            <td className="displayColumn">
              <Display />
            </td>
            <td className="padding" />
          </tr>
          <tr className="inputPadRow">
            <td className="padding" />
            <td className="inputPadColumn">
              <InputPad />
            </td>
            <td className="padding" />
          </tr>
        </tbody>
      </table>
      <div className="historyContainer">
        <History />
      </div>
    </div>
  );
}

export default App;
