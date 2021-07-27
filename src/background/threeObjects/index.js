import {scene, camera} from "./scene";
import {makeGrid} from "./grid";
import {wordsearchAnimation} from "./animation";
export {canvas} from "./scene";

const LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

const MAXDIST = 3000;
const MINDIST = 6000;

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
    wordsearchAnimation(grid, -maxDists.y);
}

gridMaker();
setInterval(() => gridMaker(), 2000);
