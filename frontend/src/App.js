import {Component} from 'inferno';
import Col from 'inferno-bootstrap/lib/Col';
import Container from 'inferno-bootstrap/lib/Container';
import Row from 'inferno-bootstrap/lib/Row';
import './App.css';
import Categories from './categories/Categories';
import CategoriesCollapse from './categories/CategoriesCollapse';
import CategoriesToggle from './categories/CategoriesToggle';
import Applications from './components/Applications';
import Search from './components/Search';
import Sort from './components/Sort';
import './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <Categories>
          <Container fluid={true} className={'no-gutters'}>
            <Row>
              <Col xs={12}>
                <div className={'float-left'}>
                  <CategoriesToggle/>
                </div>
                <div className={'float-right'}>
                  <Sort/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CategoriesCollapse/>
              </Col>
            </Row>
          </Container>
        </Categories>
        <Applications/>
      </div>
    );
  }
}

export default App;
