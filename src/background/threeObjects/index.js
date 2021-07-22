import {scene} from "./scene";
import {makeGrid} from "./grid";
import {wordsearchAnimation} from "./animation";
export {canvas} from "./scene";

const LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

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

    
    grid.position.x = Math.random() * 10000 - 5000;
    grid.position.y = 6000;
    grid.position.z = -(Math.random() * 9500) - 1500;
    
    scene.add(grid);
    wordsearchAnimation(grid);
}

setInterval(() => gridMaker(), 500);