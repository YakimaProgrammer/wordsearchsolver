import {scene, frameRate, updateHandlers} from "./scene";
import {animationConnector, clock} from "./animation";
import {makeGrid} from "./grid";
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
    grid.position.y = Math.random() * 10000 - 5000;
    grid.position.z = -(Math.random() * 9500) - 1500;
    
    var animation = new animationConnector(grid, clock, frameRate);
    animation.cubes();

    scene.add(grid);
    updateHandlers.push(animation.animate.bind(animation));
}

gridMaker();gridMaker();gridMaker();gridMaker();gridMaker();gridMaker();gridMaker();