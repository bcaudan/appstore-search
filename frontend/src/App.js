import { Component } from 'inferno';
import './registerServiceWorker';
import Categories from './components/Categories';
import Search from './components/Search';
import Sort from './components/Sort';
import Applications from './components/Applications';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <Categories/>
        <Sort/>
        <Applications/>
      </div>
    );
  }
}

export default App;
