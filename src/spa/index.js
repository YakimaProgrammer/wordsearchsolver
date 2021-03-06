import { Homepage } from "../Homepage";
import { UploadPage } from "../UploadPage";
import { connect } from "react-redux";

import style from "./index.module.css";

function AppComponent(props) {
    var activeComponent;
    
    switch (props.currentPage) {
        case 1:
            activeComponent = <UploadPage />;
            break;
        
        default:
            activeComponent = <Homepage />;
            break;        
    }
    
    return (
        <div className={style.spa}>
            {activeComponent}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentPage: state.currentPage  
    }
}

export var App = connect(mapStateToProps)(AppComponent);