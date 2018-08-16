import {Component} from 'inferno';
import Pagination from 'inferno-bootstrap/lib/Pagination';
import PaginationItem from 'inferno-bootstrap/lib/PaginationItem';
import PaginationLink from 'inferno-bootstrap/lib/PaginationLink';
import helper from '../../database/helper';
import computePaginationState from './computePaginationState';

export default class ApplicationsPagination extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayedPages: [],
      currentPage: -1,
      previous: -1,
      next: -1,
    };

    helper.on('result', ({ nbPages, page }) => {
      this.setState(computePaginationState(nbPages, page));
    });
  }

  loadPage = (event) => {
    const page = 'page' in event.target.dataset
      ? event.target.dataset.page
      : event.target.parentElement.dataset.page; // for previous / next
    helper.setPage(page).search();
  };

  render() {
    return (
      <Pagination className={'justify-content-center'}>
        {this.state.previous !== -1
          ?
          <PaginationItem>
            <PaginationLink previous data-page={this.state.previous} onClick={this.loadPage}/>
          </PaginationItem>
          :
          ''
        }
        {this.state.displayedPages.map(page =>
          <PaginationItem active={page === this.state.currentPage ? 'active' : ''}>
            <PaginationLink href="#" data-page={page} onClick={this.loadPage}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>,
        )}
        {this.state.next !== -1
          ?
          <PaginationItem>
            <PaginationLink next data-page={this.state.next} onClick={this.loadPage} href="#"/>
          </PaginationItem>
          :
          ''
        }
      </Pagination>
    )
  }
}
