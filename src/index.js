import ReactDOM from "react-dom";
import { AnimatedBackground } from "./background";
import { App } from "./spa";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

ReactDOM.render(
    <div>
        <AnimatedBackground />
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById("root")
);