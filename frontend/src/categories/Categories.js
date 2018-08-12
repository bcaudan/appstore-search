import {Component} from 'inferno';
import helper from '../database/helper';

class Categories extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: [],
    };

    helper.on('result', (content) => {
      this.setState({
        categories: content.getFacetValues('category', { sortBy: ['name:asc'] }).map(category => category.name).join(', '),
      });
    });
  }

  render() {
    return (
      <div className="categories">
        {this.state.categories}
      </div>
    );
  }
}

export default Categories;
