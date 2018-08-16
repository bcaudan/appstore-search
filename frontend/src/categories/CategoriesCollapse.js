import {Component} from 'inferno';
import Collapse from 'inferno-bootstrap/lib/Collapse';
import ListGroup from 'inferno-bootstrap/lib/List/ListGroup';
import ListGroupItem from 'inferno-bootstrap/lib/List/ListGroupItem';
import CategoriesContext from './CategoriesContext';

export default class CategoriesToggle extends Component {
  render() {
    return (
        <CategoriesContext.Consumer>
          {({ isOpen, categoriesMap, selectedCategory, toggleCategory }) => (
            <Collapse isOpen={isOpen}>
              <ListGroup>
                {Array.from(categoriesMap).map(([name]) => (
                  <ListGroupItem className={`category justify-content-between ${name === selectedCategory ? 'active' : ''}`}
                                 key={name} data-category={name}
                                 style={{ cursor: 'pointer' }}
                                 onClick={toggleCategory}>
                    {name}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Collapse>
          )}
        </CategoriesContext.Consumer>
    );
  }
}
