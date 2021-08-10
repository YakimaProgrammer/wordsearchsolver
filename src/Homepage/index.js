import { connect } from "react-redux";
import { FancyButton } from "../FancyButton";
import style from "./style.module.css";
import ToggleSwitch from "react-switch";

function HomepageComponent(props) {
    return (
        <div>
            <h1 className={style.heading}>Word Search Solver</h1>
            <h2 className={style.subtitle}>Solve any word search from just a picture</h2>
            <FancyButton onClick={props.nextPage} centerOnPage={true}>Get Started!</FancyButton>
            <label className={style.toggleSwitch}>
                <span>Animated background &nbsp;</span>
                <ToggleSwitch 
                    checked={props.backgroundIsAnimated}
                    uncheckedIcon={false} 
                    checkedIcon={false} 
                    onChange={props.updateBackgroundState.bind(null)}
                />
            </label>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        backgroundIsAnimated: state.backgroundIsAnimated   
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateBackgroundState: function(newBackgroundState) {
            return dispatch({
                type: "animatedBackground",
                backgroundIsAnimated: newBackgroundState
            });
        },
        nextPage: function() {
            return dispatch({
                type: "advancePage" 
            });
        }
    }
}

export var Homepage = connect(mapStateToProps, mapDispatchToProps)(HomepageComponent);