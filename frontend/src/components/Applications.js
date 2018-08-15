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

function truncate(content) {
  return content.length > 60 ? `${content.substr(0, 57)}...`: content
}

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
        <Container fluid={true} className={'no-gutters'}>
          <Row>
            {this.state.applications.map(application =>
              <Col xs={12} md={12} lg={6}>
                <Card key={application.objectID} className="application">
                  <a href={application.link} style={{ color: 'black' }}>
                    <Container fluid={true} className={'no-gutters'}>
                      <Row className={'align-items-center'}>
                        <Col xs={3}>
                          <Image src={application.image}/>
                        </Col>
                        <Col>
                          <CardBody>
                            <CardTitle><span dangerouslySetInnerHTML={{ __html: truncate(application.name) }}/></CardTitle>
                            <CardText>
                              <span
                                dangerouslySetInnerHTML={{ __html: `${application.category} #${application.rank}` }}/>
                            </CardText>
                          </CardBody>
                        </Col>
                      </Row>
                    </Container>
                  </a>
                </Card>
              </Col>,
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Applications;
