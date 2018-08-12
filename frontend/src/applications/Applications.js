import { Component } from 'inferno';
import helper from '../database/helper';

class Applications extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      applications: '',
    };

    helper.on('result', (content) => {
      this.setState({
        applications: JSON.stringify(content.hits.map(application => application.name), null, 2),
      });
    });
  }

  render() {
    return (
      <div className="applications">
        {this.state.applications}
      </div>
    );
  }
}

export default Applications;
