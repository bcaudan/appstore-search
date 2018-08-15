import { Component, linkEvent } from 'inferno';

const fallbackImage = './image-not-found.png';

export default class Image extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      src: props.src ? props.src : fallbackImage
    }
  }

  onImageError(instance) {
    instance.setState({ src: fallbackImage })
  }

  render() {
    return (
      <img src={this.state.src} alt="not found"
           width={175} height={175}
           onError={linkEvent(this, this.onImageError)} />
    );
  }
}
