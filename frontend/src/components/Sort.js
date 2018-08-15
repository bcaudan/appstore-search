import { Component } from 'inferno';
import ButtonDropdown from 'inferno-bootstrap/lib/ButtonDropdown';
import DropdownItem from 'inferno-bootstrap/lib/DropdownItem';
import DropdownMenu from 'inferno-bootstrap/lib/DropdownMenu';
import DropdownToggle from 'inferno-bootstrap/lib/DropdownToggle';
import helper from '../database/helper';

export default class Sort extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sort: 'desc',
      isOpen: false
    };
  }

  onSortChange = (event) => {
    const sort = event.target.dataset.sort;
    helper
      .setIndex(sort === 'desc' ? 'appstore-search' : 'appstore-search-rank-asc')
      .search();
    this.setState({ sort });
  };

  doToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  };

  render() {
    return (
      <div>
        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.doToggle}>
          <DropdownToggle caret>Sort</DropdownToggle>
          <DropdownMenu className={"dropdown-menu-right"}>
            <DropdownItem data-sort={'desc'} onClick={this.onSortChange}>Rank DESC</DropdownItem>
            <DropdownItem data-sort={'asc'} onClick={this.onSortChange}>Rank ASC</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}
