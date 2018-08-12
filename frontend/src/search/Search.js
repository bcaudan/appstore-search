import { Component } from 'inferno';
import helper from '../database/helper';

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
    };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search(event) {
    const value = event ? event.target.value : '';
    this.setState({value: value});
    helper.setQuery(value)
          .search();
  }

  render() {
    return (
      <div className="search">
        <input type="text" autoComplete="off" id="search-box"
               value={this.state.value}
               onInput={this.search}
               placeholder="Search for applications"
        />
      </div>
    );
  }
}

export default Search;
