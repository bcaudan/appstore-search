import { Component, linkEvent } from 'inferno';
import helper from '../database/helper';

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.search(this.state.value);
  }

  search(value) {
    helper.setQuery(value)
          .search();
  };

  onSearchValueChange(instance, event) {
    const { value } = event.target;
    instance.setState({ value });
    instance.search(value);
  }

  render() {
    return (
      <div className="search">
        <input type="text" autoComplete="off" id="search-box"
               value={this.state.value}
               onInput={linkEvent(this, this.onSearchValueChange)}
               placeholder="Search for applications"
        />
      </div>
    );
  }
}

export default Search;
