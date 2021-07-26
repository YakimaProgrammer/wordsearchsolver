import {
    Object3D,
    MeshBasicMaterial, 
    Mesh,
    BoxGeometry,
    Box3
} from "three";
import {scene, visibleBox, camera} from "./scene";
export {canvas} from "./scene";

var cover = new MeshBasicMaterial();
var shape = new BoxGeometry(50,50,50);
var cube = new Mesh(shape, cover);
    
scene.add(cube);

async function update() {
    for (var z = 0; z < 9500; z += 5) {
        cube.position.z = -z;
        var visBox = visibleBox(z);
        cube.position.x = visBox.min.x;
        cube.position.y = visBox.min.y;
    }
}

update();
/*
import {scene, visibleBox, camera} from "./scene";
import {makeGrid} from "./grid";
import {wordsearchAnimation} from "./animation";
export {canvas} from "./scene";

const LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function gridMaker() {
    var g = [];
    for (var x = 0; x < 5; x++) {
        g.push([
            LETTERS[Math.floor(Math.random() * 26)],
            LETTERS[Math.floor(Math.random() * 26)],
            LETTERS[Math.floor(Math.random() * 26)],
            LETTERS[Math.floor(Math.random() * 26)],
            LETTERS[Math.floor(Math.random() * 26)]
            ]);
    }
    var grid = makeGrid(g);
    
    
    grid.position.z = -randBetween(camera.near + 1500, camera.far);
    
    var visBox = visibleBox(-grid.position.z);
    grid.position.x = randBetween(visBox.min.x, visBox.max.x) / 2;
    grid.position.y = visBox.min.y / 2;
    
    console.log(grid.position);
    
    scene.add(grid);
    wordsearchAnimation(grid);
}

gridMaker();
setInterval(() => gridMaker(), 2000);
*/
