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
        <img className={`${this.state.loaded ? 'hidden' : 'visible'} loading`}
             src={'./spinner.gif'} alt="" width={'100%'}/>
        <img className={`${this.state.loaded ? 'visible' : 'hidden'}`}
             src={this.state.src} alt="" width={'100%'}
             onError={linkEvent(this, this.onImageError)}
             onLoad={linkEvent(this, this.onImageLoaded)}/>
      </div>
    )

  }
}
