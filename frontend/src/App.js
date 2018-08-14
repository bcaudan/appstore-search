import { Component } from 'inferno';
import './registerServiceWorker';
import Categories from './components/Categories';
import Search from './components/Search';
import Applications from './components/Applications';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <Categories/>
        <Applications/>
      </div>
    );
  }
}

export default App;
