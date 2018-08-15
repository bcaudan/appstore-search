import { Component } from 'inferno';
import helper from '../database/helper';
import Image from './Image';

class Applications extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      applications: [],
    };

    helper.on('result', (content) => {
      this.setState({
        applications: content.hits,
      });
    });
  }

  render() {
    return (
      <div className="applications">
        {this.state.applications.map(application =>
          <div className={application} key={application.objectID}>
            <a href={application.link} target={"_blank"}>
              <Image src={application.image} />
            </a>
            <br/>{application.name}
            <br/>rank: {application.rank}
            <br/>category: {application.category}
            <br/><a href={application.link} target={"_blank"}>details</a>
          </div>
        )}
      </div>
    );
  }
}

export default Applications;
