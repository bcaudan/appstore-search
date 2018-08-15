import {Component, linkEvent} from 'inferno';
import Button from 'inferno-bootstrap/lib/Button';
import Collapse from 'inferno-bootstrap/lib/Collapse';
import ListGroup from 'inferno-bootstrap/lib/List/ListGroup';
import ListGroupItem from 'inferno-bootstrap/lib/List/ListGroupItem';
import helper from '../database/helper';

class Categories extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpen: false,
      categoriesMap: new Map(),
      selectedCategory: null,
    };

    helper.on('result', (content) => {
      this.setState(({ categoriesMap }) => {
        const updated = this.updateCategories(
          categoriesMap,
          content
            .getFacetValues('category', { sortBy: ['name:asc'] })
            .map(({ name, count }) => ({ name, count })),
        );
        return { categoriesMap: updated }
      });
    });
  }

  updateCategories(categoriesMap, newCategories) {
    for (const name of categoriesMap.keys()) {
      categoriesMap.set(name, 0);
    }
    newCategories.forEach(category => {
      categoriesMap.set(category.name, category.count);
    });
    return categoriesMap;
  }

  toggleCategory(instance, event) {
    const category = event.target.dataset.category;
    instance.setState(({ selectedCategory: previousCategory }) => {
      const selectedCategory = previousCategory === category ? null : category;
      if (previousCategory) {
        helper.toggleFacetRefinement('category', previousCategory);
      }
      if (selectedCategory) {
        helper.toggleFacetRefinement('category', selectedCategory);
      }
      helper.search();
      return { selectedCategory }
    });
    instance.doToggle();
  }

  doToggle = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  };

  render() {
    return (
      <div className="categories">
        <Button onClick={this.doToggle}>Display: {this.state.selectedCategory || 'All categories' }</Button>
        <Collapse isOpen={this.state.isOpen}>
            <ListGroup>
            {Array.from(this.state.categoriesMap).map(([name]) => (
              <ListGroupItem className={`justify-content-between ${name === this.state.selectedCategory ? 'active' : ''}`}
                             key={name} data-category={name}
                             style={{cursor: 'pointer'}}
                             onClick={linkEvent(this, this.toggleCategory)}>
                {name}
              </ListGroupItem>
            ))}
            </ListGroup>
        </Collapse>
      </div>
    );
  }
}

export default Categories;
