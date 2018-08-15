import {Component} from 'inferno';
import Card from 'inferno-bootstrap/lib/Card/Card';
import CardBody from 'inferno-bootstrap/lib/Card/CardBody';
import CardText from 'inferno-bootstrap/lib/Card/CardText';
import CardTitle from 'inferno-bootstrap/lib/Card/CardTitle';
import Col from 'inferno-bootstrap/lib/Col';
import Container from 'inferno-bootstrap/lib/Container';
import Row from 'inferno-bootstrap/lib/Row';
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
          <Card key={application.objectID} className="application" style={{ minWidth: 525, maxHeight: 175 }}>
            <a href={application.link} target={'_blank'} style={{ color: 'black' }}>
              <Container fluid={true} className={'no-gutters'}>
                <Row>
                  <Col style={{maxWidth: 175}}>
                    <Image src={application.image}/>
                  </Col>
                  <Col>
                    <CardBody>
                      <CardTitle><span dangerouslySetInnerHTML={{ __html: application.name }}/></CardTitle>
                      <CardText>
                        <span dangerouslySetInnerHTML={{ __html: `${application.category} #${application.rank}` }}/>
                      </CardText>
                    </CardBody>
                  </Col>
                </Row>
              </Container>
            </a>
          </Card>,
        )}
      </div>
    );
  }
}

export default Applications;
