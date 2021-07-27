import {scene, visibleBox, camera} from "./scene";
import {makeGrid} from "./grid";
import {wordsearchAnimation} from "./animation";
//import {Frustum, Matrix4} from "three";
export {canvas} from "./scene";
/*
camera.updateMatrix(); // make sure camera's local matrix is updated
camera.updateMatrixWorld(); // make sure camera's world matrix is updated
camera.matrixWorldInverse.getInverse( camera.matrixWorld );

var frustum = new Frustum();
frustum.setFromMatrix( new Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );

console.log(camera);
debugger;
*/
const LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

const MAXDIST = 4000;
const MINDIST = 2000;

function calcMaxXY(dist) {
    const Y = Math.tan((camera.fov / 2) * (Math.PI / 180)) * dist;
    const X = camera.aspect * Y;
    return {x: X, y: Y};
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
    
    
    grid.position.z = -randBetween(MINDIST, MAXDIST);
    var maxDists = calcMaxXY(-grid.position.z);
    grid.position.x = randBetween(-maxDists.x, maxDists.x);
    grid.position.y = maxDists.y;
    
    console.log(grid.position);
    
    scene.add(grid);
    wordsearchAnimation(grid);
}

gridMaker();
setInterval(() => gridMaker(), 2000);
