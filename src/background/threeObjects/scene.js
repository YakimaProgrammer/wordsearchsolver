import {Scene, PerspectiveCamera, WebGLRenderer, Clock} from "three";
import style from "./index.module.css";

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;

var renderer = new WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
var canvas = renderer.domElement;
canvas.className = style.threeCanvas;

var scene = new Scene();

var clock = new Clock();
const TARGETFRAMERATE = 1/60;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
var frameRate = {
    lastFrameTime: TARGETFRAMERATE,
    lastFrames: new Array(10).fill(TARGETFRAMERATE),
    averageFrameTime: TARGETFRAMERATE,
    index: 0,
    multiplier: 1
}
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
    var elapsed = clock.getDelta();
    frameRate.lastFrameTime = elapsed;
    frameRate.lastFrames[frameRate.index] = elapsed;
    frameRate.index = (frameRate.index + 1) % frameRate.lastFrames.length;
    frameRate.averageFrameTime = frameRate.lastFrames.reduce(reducer) / 
                                 frameRate.lastFrames.length;
    frameRate.multiplier = frameRate.averageFrameTime / TARGETFRAMERATE;

    for (var f of updateHandlers) {
        f();
    }
}
var updateHandlers = [];
animate();

export {canvas, frameRate, scene, updateHandlers};