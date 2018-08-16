import {Component} from 'inferno';
import helper from '../../database/helper';
import config from '../../database/config';
import CategoriesContext from './CategoriesContext';

export default class Categories extends Component {
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
            .getFacetValues(config.facet, { sortBy: ['name:asc'] })
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

  toggleCategory = (event) => {
    const category = event.target.dataset.category;
    this.setState(({ selectedCategory: previousCategory }) => {
      const selectedCategory = previousCategory === category ? null : category;
      if (previousCategory) {
        helper.toggleFacetRefinement(config.facet, previousCategory);
      }
      if (selectedCategory) {
        helper.toggleFacetRefinement(config.facet, selectedCategory);
      }
      helper.search();
      return { selectedCategory }
    });
    this.doToggle();
  };

  doToggle = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  };

  render() {
    return (
      <CategoriesContext.Provider
        value={{
          doToggle: this.doToggle,
          isOpen: this.state.isOpen,
          selectedCategory: this.state.selectedCategory,
          toggleCategory: this.toggleCategory,
          categoriesMap: this.state.categoriesMap,
        }}>
        <div>
          {this.props.children}
        </div>
      </CategoriesContext.Provider>
    );
  }
}
