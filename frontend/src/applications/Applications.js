import { Component } from 'inferno';
import helper from '../database/helper';

class Applications extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      results: '',
    };

    helper.on('result', (content) => {
      this.setState({
        results: JSON.stringify(content.hits, null, 2)
      })
    });
  }

  render() {
    return (
      <div className="applications">
        {this.state.results}
      </div>
    );
  }
}

export default Applications;
