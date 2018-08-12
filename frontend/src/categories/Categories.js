import {Component, linkEvent} from 'inferno';
import helper from '../database/helper';

class Categories extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: [],
      selectedCategory: null
    };

    helper.on('result', (content) => {
      this.setState({
        categories: content.getFacetValues('category', { sortBy: ['name:asc'] }),
      });
    });
  }

  // TODO find something idiomatic
  toggleCategory(category) {
    return (instance) => {
      const selectedCategory = instance.state.selectedCategory === category ? null : category;
      helper
        .toggleFacetRefinement('category', category)
        .search();
      instance.setState({ selectedCategory: selectedCategory });
    }
  }

  render() {
    return (
      <ul className="categories">
        {this.state.categories.map(category => (
          <li key={category.name} onClick={ linkEvent(this, this.toggleCategory(category.name)) }>{category.name}</li>
        ))}
      </ul>
    );
  }
}

export default Categories;
