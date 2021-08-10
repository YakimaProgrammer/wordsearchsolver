import { connect } from "react-redux";
import { SimplePage } from "../SimplePage";
import style from "./style.module.css";
import ToggleSwitch from "react-switch";

function HomepageComponent(props) {
    return (
        <SimplePage
            title="Word Search Solver"
            subtitle="Solve any word search from just a picture"
            buttonText="Get Started!"
            onButtonClick={props.nextPage}
            showButton={true}
        >
            <label className={style.toggleSwitch}>
                <span>Animated background &nbsp;</span>
                <ToggleSwitch 
                    checked={props.backgroundIsAnimated}
                    uncheckedIcon={false} 
                    checkedIcon={false} 
                    onChange={props.updateBackgroundState.bind(null)}
                />
            </label>
        </SimplePage>
    )
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