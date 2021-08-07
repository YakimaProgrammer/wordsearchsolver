import { Homepage } from "../Homepage";
import style from "./index.module.css";

export function App(props) {
    return (
        <div className={style.spa}>
            <Homepage />
        </div>
    );
}