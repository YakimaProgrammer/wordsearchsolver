import fontData from "../../resources/font/font.json";
import {
    FontLoader, 
    TextGeometry, 
    MeshNormalMaterial, 
    Mesh, 
    Object3D
} from "three";

var loader = new FontLoader();
var font = loader.parse(fontData);

function renderLetter(letter, size) {
    var shape = new TextGeometry(letter, {font: font, size: size, height: 1});
    var cover = new MeshNormalMaterial();
    var textGeo = new Mesh(shape, cover);
    
    textGeo.geometry.computeBoundingBox();
    var box = textGeo.geometry.boundingBox.max;
    
    //Helps recenter the text so the center line isn't all over the place
    var text = new Object3D();
    text.add(textGeo);
    textGeo.position.x = -box.x / 2;
    textGeo.position.y = -box.y / 2;
    textGeo.position.z = -box.z / 2;
    
    return text; 
}

export {renderLetter};