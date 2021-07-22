import {Scene, PerspectiveCamera, WebGLRenderer, Clock} from "three";
import {update} from "@tweenjs/tween.js";
import style from "./index.module.css";

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;
//camera.rotation.z = Math.PI / 4;

var renderer = new WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
var canvas = renderer.domElement;
canvas.className = style.threeCanvas;

var scene = new Scene();

//var clock = new Clock();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    update(/*clock.getElapsedTime()*/);
}
animate();

function destroy(obj) {
    scene.remove(obj);
    if (obj.children) {
        for (var child of obj.children) {
            destroy(child);
        }
    }
    if (obj.material) obj.material.dispose();
    if (obj.geometry) obj.geometry.dispose();
    if (obj.texture) obj.texture.dispose();
    
    //might as well just iterate the obj and try to dispose of everything
}

export {canvas, scene, destroy};