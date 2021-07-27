class StateTracker {
    constructor(obj) {
        this.obj = obj;
        this.material = this.obj.material ? this.obj.material : this.obj.children[0].material;
        this.save();
    }
    
    save() {
        this.position = this.obj.position.clone();
        this.rotation = this.obj.rotation.clone();
        this.visible = this.obj.visible;
        this.opacity = this.material.opacity;
    }
    
    restore() {
        this.obj.position.copy(this.position);
        this.obj.rotation.copy(this.rotation);
        this.obj.visible = this.visible;
        this.material.opacity = this.opacity;
    }
}

class ResetableGrid {
    constructor(grid) {
        this.knownChildren = grid.children.map(c => new StateTracker(c));
        this.grid = grid;
    }
    
    restore() {
        this.knownChildren.forEach(c => c.restore());
    }
    
    getGrid() {
        return this.grid;
    }
}

class Allocator {
    //I don't know what to call this
    constructor(constructorCallback) {
        this.constructorCallback = constructorCallback;
        this.knownObjects = [];
    }
    
    allocate() {
        var obj;
        for (obj of this.knownObjects) {
            if (!obj.allocated) {
                obj.allocated = true;
                return obj.ref;
            }
        }
        
        obj = this.constructorCallback();
        this.knownObjects.push({
            allocated: true,
            ref: obj
        });
        return obj;
    }

    deallocate(obj) {
        for (var knownObj of this.knownObjects) {
            if (knownObj.ref === obj) {
                knownObj.allocated = false;
            }
        }
    }
}

export {ResetableGrid, Allocator};