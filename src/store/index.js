import { createStore } from "redux";
import { rotateCameraAnimation } from "../background/threeObjects/animation";
import { enableAnimation, disableAnimation } from "../background/threeObjects/scene";

//Gotta scope your localStorage keys, right?
const KEY = "wordsearch.animatedBackground";

//Listen, the spec said this COULD throw an error, so...
function getStorageValue() {
    try {
        return localStorage.getItem(KEY) === "true" || localStorage.getItem(KEY) === null;
    } catch {
        return true;   
    }
}

function setStorageValue(value) {
    try {
        localStorage.setItem(KEY, value)
    } catch {
        //do nothing
    }
}
    

function reducer(state, action) {
    if (state === undefined) {
        state = {
            currentPage: 0,
            backgroundIsAnimated: getStorageValue()
        }
    }
    
    if (action.type === "advancePage") {
        //Because modifying the state directly is a very bad thing
        state = {
            ...state, 
            currentPage: state.currentPage + 1
        }
    }
    
    if (action.type === "animatedBackground") {
        state = {
            ...state, 
            backgroundIsAnimated: action.backgroundIsAnimated
        }
    }
    
    return state;
}

//What, you mean OTHER people might want to use this variable?
export var store = createStore(reducer);

//This is probably not how you should do this
//I *could* merge this into the AnimatedBackground component, but I can't think of a logical way to do that
store.subscribe(() => {
    const backgroundIsAnimated = store.getState().backgroundIsAnimated;
    
    //Let's keep this in sync with localStorage!
    setStorageValue(backgroundIsAnimated);
    
    //Now let's make sure the switch actually does something!
    if (backgroundIsAnimated) {
        enableAnimation();
    } else {
        disableAnimation();
    }
});
    
//And another for good measure!
//I'm not sure where else this could logically fit in...
store.subscribe(() => {
    const currentPage = store.getState().currentPage;
    
    switch (currentPage) {
        case 1:
            rotateCameraAnimation({z: Math.PI / 8});
            break;
        
        case 2:
            rotateCameraAnimation({z: -Math.PI / 8});
            break;
            
        /* 
        case 3:
            rotateCameraAnimation({z: -Math.PI});
            break;
        */
            
        default:
            rotateCameraAnimation({z: 0});
    }
});