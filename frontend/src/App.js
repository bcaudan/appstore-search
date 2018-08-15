import { Component } from 'inferno';
import './registerServiceWorker';
import Col from 'inferno-bootstrap/lib/Col';
import Container from 'inferno-bootstrap/lib/Container';
import Row from 'inferno-bootstrap/lib/Row';
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
        <Container fluid={true} className={'no-gutters'}>
          <Row>
            <Col>
              <Categories/>
            </Col>
            <Col>
              <Sort/>
            </Col>
          </Row>
        </Container>
        <Applications/>
      </div>
    );
  }
}

export default App;
