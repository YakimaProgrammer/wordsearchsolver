import {Component} from "react";
import {canvas} from "./threeObjects";
import {rotateCameraAnimation} from "./threeObjects/animation";
export class AnimatedBackground extends Component {
    render() {
        return (
            <div ref={ref => (this.mount = ref)} onClick={rotateCameraAnimation}></div>
        );
    }
    
    componentDidMount() { 
        //Canvas is a DOMNode, not a JSX element
        this.mount.appendChild(canvas);
    }
}
