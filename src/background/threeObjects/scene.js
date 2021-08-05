import {
    Scene, 
    PerspectiveCamera, 
    WebGLRenderer
} from "three";
import { update } from "@tweenjs/tween.js";
import style from "./index.module.css";

var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = -500;

var renderer = new WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
var canvas = renderer.domElement;
canvas.classList.add(style.threeCanvas);

var scene = new Scene();

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
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
 }

export {canvas, scene, destroy, camera};