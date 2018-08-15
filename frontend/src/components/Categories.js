import {Component, linkEvent} from 'inferno';
import helper from '../database/helper';

class Categories extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      categoriesMap: new Map(),
      selectedCategory: null,
    };

    helper.on('result', (content) => {
      this.setState(({categoriesMap}) => {
        const updated = this.updateCategories(
          categoriesMap,
          content
            .getFacetValues('category', { sortBy: ['name:asc'] })
            .map(({ name, count }) => ({ name, count }))
        );
        return {categoriesMap: updated}
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
        {Array.from(this.state.categoriesMap).map(([name, count]) => (
          <li key={name} data-category={name}
              onClick={linkEvent(this, this.toggleCategory)}>{name} ({count})</li>
        ))}
      </ul>
    );
  }
}

export default Categories;
