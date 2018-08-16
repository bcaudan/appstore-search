import {Component} from 'inferno';
import Button from 'inferno-bootstrap/lib/Button';
import CategoriesContext from './CategoriesContext';

export default class CategoriesToggle extends Component {
  render() {
    return (
        <CategoriesContext.Consumer>
          {({ doToggle, selectedCategory }) => (
            <Button className={'category-toggle'} onClick={doToggle}>Display: {selectedCategory || 'All categories'}</Button>
          )}
        </CategoriesContext.Consumer>
    );
  }
}
