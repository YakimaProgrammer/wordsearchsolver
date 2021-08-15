class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Box {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

class Line {
    constructor(point1, point2) {
        this.slope = (point2.y - point1.y)/(point2.x - point1.x);
        this.intercept = point1.y - (this.slope * point1.x);
    }
    
    translateDown(amount) {
        this.intercept -= amount;
        return this;
    }
    
    valueAt(x) {
        return this.slope * x + this.intercept;   
    }
    
    intersectsBox(box) {
        return this.valueAt(box.min.x) < box.min.y && this.valueAt(box.max.x) > box.max.y;   
    }
}

function identity(x) { return x };
const NOEXCLUDE = new Set();

const EXCLUDEINTERSECTCOUNT = new Set([0,1]);
function intersectionKey(x) { return x.intersectCount };

function slopeKey(x) { return x.key };

const MAXDIFFERENCE = 1/250;
function areApproximatelyEqual(num1, num2, maxdiff=MAXDIFFERENCE) {
    return Math.abs(num1 - num2) < maxdiff;   
}


//Well, for a while I was O(n). Now I'm O(n**2), I think.
function getMode(elements, keyFunc, exclude, equityCheckFunc) {
    if (!keyFunc) keyFunc = identity;
    if (!exclude) exclude = NOEXCLUDE;
    
    var frequencies = {};
    var maxFreq = 0;
    var maxFreqKey = null;
    
    for (var element of elements) {
        let key = keyFunc(element);
        
        if (!!equityCheckFunc) {
            for (let knownKey of Object.keys(frequencies)) {
                if (equityCheckFunc(key, knownKey)) {
                    key = knownKey;
                    break;
                }
            }
        }
        
        if (!!frequencies[key]) {
            frequencies[key].count++;
            frequencies[key].elements.push(element);
        } else {
            frequencies[key] = {key: key, count: 1, elements: [element]};   
        }
        
        if (frequencies[key].count > maxFreq && !exclude.has(key)) {
            maxFreq = frequencies[key].count;   
            maxFreqKey = key;
        }
    }
    
    return frequencies[maxFreqKey];
}

function connectBoxes(boxes) {
    var lines = [];
    var allIntersects = [];
    
    for (let box1 of boxes) {
        for (let box2 of boxes) {
            if (box1 === box2) continue;
            //optimize for box1 -> box2 : box2 -> box1
            
            let line = new Line(box1.max, box2.max).translateDown((box1.max.y - box1.min.y)/2);
            lines.push(line);
            
            let thisBoxIntersects = {slope: line.slope, intersectCount: 0, intersects: []};
            for (let box3 of boxes) {
                if (line.intersectsBox(box3)) {
                    thisBoxIntersects.intersects.push(box3);
                    thisBoxIntersects.intersectCount++;
                }
            }
            
            allIntersects.push(thisBoxIntersects);
        }
    }
    
    var mostCommonIntersectCount = getMode(allIntersects, intersectionKey, EXCLUDEINTERSECTCOUNT);
    var mostCommonSlope = getMode(mostCommonIntersectCount.elements.map(x => x.slope), null, null, areApproximatelyEqual);
    console.log(mostCommonSlope);
}

/*
for (var i = 0; i < 15; i++) {
    var x = Math.random() * 10;
    var y = Math.random() * 10;
   
    console.log("new Box(new Point("+x+","+y+"), new Point("+(x+1)+","+(y-1)+")),");    
}
*/

connectBoxes([new Box(new Point(8.894895182265357,1.575965210125767), new Point(9.894895182265357,0.5759652101257671)),
new Box(new Point(5.499061677463175,5.570844607497946), new Point(6.499061677463175,4.570844607497946)),
new Box(new Point(0.3881943769309082,4.740376464174007), new Point(1.3881943769309082,3.740376464174007)),
new Box(new Point(2.350229381133546,1.138145142797482), new Point(3.350229381133546,0.13814514279748202)),
new Box(new Point(1.503120695457385,5.536770480211035), new Point(2.503120695457385,4.536770480211035)),
new Box(new Point(5.9870364634102735,9.022860461943672), new Point(6.9870364634102735,8.022860461943672)),
new Box(new Point(5.91323960968436,3.6948265835852467), new Point(6.91323960968436,2.6948265835852467)),
new Box(new Point(2.1852230933675254,3.720255151172114), new Point(3.1852230933675254,2.720255151172114)),
new Box(new Point(2.67702838529855,7.0986636637278355), new Point(3.67702838529855,6.0986636637278355)),
new Box(new Point(3.4071226699133894,4.627774455471069), new Point(4.40712266991339,3.6277744554710694)),
new Box(new Point(3.676792976336012,7.816096396694132), new Point(4.676792976336012,6.816096396694132)),
new Box(new Point(4.4509755436963765,6.270524381555362), new Point(5.4509755436963765,5.270524381555362)),
new Box(new Point(1.1635825631427776,2.403993014117136), new Point(2.1635825631427776,1.4039930141171362)),
new Box(new Point(1.9096160709458276,3.2232622798606148), new Point(2.9096160709458276,2.2232622798606148)),
new Box(new Point(7.312935410720344,4.654700302572419), new Point(8.312935410720344,3.6547003025724187)),]);