import {
    Clock,     
    MeshBasicMaterial, 
    Mesh,
    BoxGeometry
} from "three";

//I don't want to mess up my framerate calculations
const clock = new Clock();

class animationConnector {
    constructor(obj, clock, frameRate) {
        this.obj = obj;
        this.clock = clock;
        this.controller = frameRate;
        this.targets = [];
    }
    
    cubes() {
        var cubes = [];
        for (var i = 0; i < 50; i++) {
            let cover = new MeshBasicMaterial({transparent: true, color: "rgb(255, "+ Math.floor(Math.random() * 255)+ ", 0)"});
            let shape = new BoxGeometry(50, 50, 50);
            let cube = new Mesh(shape, cover);
            
            this.obj.add(cube);
            cubes.push(cube);
        }
        
        this.startExploding(cubes, 10);
        console.log(this.targets);
        setTimeout(() => {
            this.startExploding(this.obj.children, 3);
        }, 1500);
    }
    
    startExploding(targets, MAX) {
        for (let target of targets) {
            let coeffX = Math.random() * MAX - MAX/2;
            let coeffY = Math.random() * MAX - MAX/2;
            let coeffZ = Math.random() * MAX - MAX/2;
            
            let rotCoeffX = Math.random() * MAX - MAX/2;
            let rotCoeffY = Math.random() * MAX - MAX/2;
            let rotCoeffZ = Math.random() * MAX - MAX/2;
            
            this.targets.push(function(multiplier, elapsed) {
                try {
                    target.children[0].material.opacity = 
                        target.children[0].material.opacity / 1.00125 - 0.0005;
                } catch {
                    target.material.opacity = 
                        target.material.opacity / 1.0025 - 0.0005;
                }
                target.position.x += elapsed * coeffX * multiplier;
                target.position.y += elapsed * coeffY * multiplier;
                target.position.z += elapsed * coeffZ * multiplier;
                
                target.rotation.x = Math.PI * elapsed * rotCoeffX * multiplier;
                target.rotation.y = Math.PI * elapsed * rotCoeffY * multiplier;
                target.rotation.z = Math.PI * elapsed * rotCoeffZ * multiplier;
            });
        }
    }
    
    animate() {
        var elapsed = this.clock.getElapsedTime();
        for (var target of this.targets) {
            target(this.controller.multiplier, elapsed);
        }
    }
}

export {clock, animationConnector};