import {
    MeshBasicMaterial, 
    Mesh,
    BoxGeometry
} from "three";
import {Tween, Easing} from "@tweenjs/tween.js";
import {scene, destroy} from "./scene";

const MAXDIST = 2000;
const MAXROT = Math.PI * 2 * 3;
const TIME = 3000;
const EASING = Easing.Linear.None;
const DELAY = 725;

const FALLEND = -6000;
const FALLTIME = 15000;

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

function fall(obj) {
    new Tween(obj.position)
        .to({y: FALLEND}, FALLTIME)
        .easing(EASING)
        .start();
}

function wordsearchAnimation(obj) {
    fall(obj);
    setTimeout(() => detonationAnimation(obj), Math.random() * (FALLTIME/2))
}

export {wordsearchAnimation, fall, detonationAnimation};