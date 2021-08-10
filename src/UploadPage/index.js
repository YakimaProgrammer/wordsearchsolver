import { SimplePage } from "../SimplePage";
import { connect } from "react-redux";

function UploadPageComponent(props) {
    return <SimplePage
        title="Upload a picture"
        subtitle="All those words are about to be found!"
        content="Tip: sharp photos that fill the frame work best. Try to position your camera so that the page isn't tilted."
        buttonText="I'm ready!"
        showButton={true}
        onButtonClick={props.nextPage}
    />
}

function mapDispatchToProps(dispatch) {
    return {
        nextPage: function() {
            return dispatch({
                type: "advancePage" 
            });
        }
    }
}
    
export var UploadPage = connect(null, mapDispatchToProps)(UploadPageComponent);