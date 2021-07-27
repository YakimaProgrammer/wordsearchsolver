import {
    MeshBasicMaterial, 
    Mesh,
    BoxGeometry
} from "three";
import {Tween, Easing} from "@tweenjs/tween.js";
import {destroy, camera} from "./scene";

//Explosion
const MAXDIST = 4000;
const MAXROT = Math.PI * 2 * 3;
const TIME = 1500;
const EASING = Easing.Linear.None;
const DELAY = 242;

//Falling
const FALLTIME = 5000;
const MAXEXPLODEDELAY = 3500;

function rand(abs) {
    // returns a value between -abs/2 and abs/2
    return Math.random() * abs - abs/2;
}

function createTranslation(start, amount, easing, time) {
    const stop = {
        x: rand(amount) + start.x,
        y: rand(amount) + start.y,
        z: rand(amount) + start.z,
    }
    new Tween(start)
        .to(stop, TIME)
        .easing(EASING)
        .start();
}

function explode(obj, remove) {
    createTranslation(obj.position, MAXDIST, EASING, TIME);
    createTranslation(obj.rotation, MAXROT, EASING, TIME);
    
    var mat = obj.material ? obj.material : obj.children[0].material;
    new Tween(mat)
        .to({opacity: 0}, TIME)
        .easing(EASING)
        .start();
    
    if (remove) setTimeout(() => destroy(obj), TIME);
}

function detonationAnimation(obj) {
    var originalChildren = [...obj.children];
    
    for (var i = 0; i < 50; i++) {
            let cover = new MeshBasicMaterial({transparent: true, color: "rgb(255, "+ Math.floor(Math.random() * 255)+ ", 0)"});
            let shape = new BoxGeometry(50, 50, 50);
            let cube = new Mesh(shape, cover);
            
            obj.add(cube);
            
            explode(cube, true);
    }
    
    setTimeout(() => {
        for (var child of originalChildren) {
            explode(child, true);
        }
    }, DELAY);
}

function fall(obj, end) {
    new Tween(obj.position)
        .to({y: end}, FALLTIME)
        .easing(EASING)
        .start();
}

function wordsearchAnimation(obj, end) {
    fall(obj, end);
    setTimeout(() => detonationAnimation(obj), Math.random() * MAXEXPLODEDELAY);
}


function rotateCameraAnimation() {
    new Tween(camera.rotation)
        .to({z: Math.PI / 4}, 1500)
        .easing(EASING)
        .start();
}
export {wordsearchAnimation, rotateCameraAnimation};