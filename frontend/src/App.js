import { Component } from 'inferno';
import './registerServiceWorker';
import Search from './search/Search';
import Applications from './applications/Applications';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <Applications/>
      </div>
    );
  }
}

export default App;
