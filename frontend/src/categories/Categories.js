import {Component, linkEvent} from 'inferno';
import helper from '../database/helper';

class Categories extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: [],
      selectedCategory: null,
    };

    helper.on('result', (content) => {
      this.setState({
        categories: content.getFacetValues('category', { sortBy: ['name:asc'] }),
      });
    });
  }

  toggleCategory(instance, event) {
    const category = event.target.dataset.category;
    helper
      .toggleFacetRefinement('category', category)
      .search();
    instance.setState(({selectedCategory: previousCategory}) => {
      const selectedCategory = previousCategory === category ? null : category;
      return { selectedCategory }
    });
  }

  render() {
    return (
      <ul className="categories">
        {this.state.categories.map(category => (
          <li key={category.name} data-category={category.name}
              onClick={linkEvent(this, this.toggleCategory)}>{category.name} ({category.count})</li>
        ))}
      </ul>
    );
  }
}

export default Categories;
