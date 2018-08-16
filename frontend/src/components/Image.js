import {Component, linkEvent} from 'inferno';

const FALLBACK_IMAGE = './image-not-found.png';

export default class Image extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loaded: false,
      src: props.src ? props.src : FALLBACK_IMAGE,
    }
  }

  onImageError(instance) {
    instance.setState({ src: FALLBACK_IMAGE })
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
