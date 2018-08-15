import {Component, linkEvent} from 'inferno';

const fallbackImage = './image-not-found.png';

export default class Image extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loaded: false,
      src: props.src ? props.src : fallbackImage,
    }
  }

  onImageError(instance) {
    instance.setState({ src: fallbackImage })
  }

  onImageLoaded(instance) {
    instance.setState({ loaded: true })
  }

  render() {
    return (
      <div>
        <img src={'./spinner.gif'} width={'100%'} style={{ display: this.state.loaded ? 'none' : 'block' }}/>
        <img src={this.state.src}  width={'100%'} style={{ display: this.state.loaded ? 'block' : 'none' }}
             onError={linkEvent(this, this.onImageError)}
             onLoad={linkEvent(this, this.onImageLoaded)}/>
      </div>
    )

  }
}
