import { Component, linkEvent } from 'inferno';
import helper from '../database/helper';

export default class Sort extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sort: 'DESC',
    };
  }

  onSortChange(instance) {
    instance.setState(({sort: previousSort}) => {
      const sort = instance.opposite(previousSort);
      helper
        .setIndex(sort === 'DESC' ? 'appstore-search' : 'appstore-search-rank-asc')
        .search();
      return {sort}
    })
  }

  opposite(sort) {
    return sort === 'DESC' ? 'ASC' : 'DESC';
  }

  render() {
    return (
      <div>
        <input type="button" value={`Sort ${this.opposite(this.state.sort)}`} onClick={linkEvent(this, this.onSortChange)}/>
      </div>
    )
  }
}
