import React, {Component} from 'react';
import s from './videoLayer.module.css'
import vidos from './../../videos/belazVrZem.mp4'

class VideoLayer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: './src/videos/belazVrZem.mp4'
        }
    }

    render () {
        return (
            <video className={s.video} loop="loop" autoPlay="1" muted="muted">
                <source src={vidos} type="video/mp4" />
            </video>
        )
    }
}

export default VideoLayer;

