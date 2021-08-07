import { Component } from "react";
//things work out when you export this from threeObjects/index.js and then import it here 
import { canvas } from "./threeObjects";

export class AnimatedBackground extends Component {
    render() {
        return (
            <div ref={ref => (this.mount = ref)}></div>
        );
    }
    
    componentDidMount() { 
        //Canvas is a DOMNode, not a JSX element
        this.mount.appendChild(canvas);
    }
}
