import {renderLetter} from "./fontRender";
import {
    Object3D,
    MeshNormalMaterial, 
    Mesh,
    BoxGeometry,
    Box3,
    MeshBasicMaterial
} from "three";

const SIZE = 100;
const SPACING = 135;

//https://stackoverflow.com/a/32850374
function makeGrid(letters) {
    var grid = new Object3D();
    var height = letters.length;
    var width = letters[0].length;
    
    for (var h = 0; h < height; h++) {
        for (var w = 0; w < width; w++) {
            var letter = renderLetter(letters[h][w], SIZE);
            letter.position.y = -((h-height/2) * SPACING) - SPACING/2;
            letter.position.x = (w-width/2) * SPACING + SPACING/2;
            
            grid.add(letter);
        }
    }
    
    frame(grid);
    cubes(grid);
    return grid;
}

const FRAMEWIDTH = 25;
function frame(obj) {
    //Object3D doesn't have .geometry
    var box = new Box3().setFromObject(obj);
    var dim = {
        width: box.max.x - box.min.x,
        height: box.max.y - box.min.y,
        depth: box.max.z - box.min.z
    };
    
    var shape, side, cover = new MeshNormalMaterial({transparent: true});
 
    //right
    shape = new BoxGeometry(dim.height + FRAMEWIDTH * 5, FRAMEWIDTH, 1);
    side = new Mesh(shape, cover);
    
    side.rotation.z = Math.PI / 2;
    side.position.x = dim.width / 2 + FRAMEWIDTH*2;
    
    obj.add(side);
    
    //left
    shape = new BoxGeometry(dim.height + FRAMEWIDTH * 5, FRAMEWIDTH, 1);
    side = new Mesh(shape, cover);
    
    side.rotation.z = Math.PI / 2;
    side.position.x = -dim.width / 2 - FRAMEWIDTH*2;

    obj.add(side);
    
    //top
    shape = new BoxGeometry(dim.width + FRAMEWIDTH * 5, FRAMEWIDTH, 1);
    side = new Mesh(shape, cover);
    
    side.rotation.z = Math.PI;
    side.position.y = dim.height / 2 + FRAMEWIDTH*2;

    obj.add(side);

    //bottom
    shape = new BoxGeometry(dim.width + FRAMEWIDTH * 5, FRAMEWIDTH, 1);
    side = new Mesh(shape, cover);
    
    side.rotation.z = Math.PI;
    side.position.y = -dim.height / 2 - FRAMEWIDTH*2;

    obj.add(side);    
}

function cubes(grid) {
    for (var i = 0; i < 50; i++) {
        let cover = new MeshBasicMaterial({transparent: true, color: "rgb(255, "+ Math.floor(Math.random() * 255)+ ", 0)"});
        let shape = new BoxGeometry(50, 50, 50);
        let cube = new Mesh(shape, cover);
        cube.name = "cube";
        cube.visible = false;
        grid.add(cube);
    }
}

export {makeGrid};