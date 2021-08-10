import { FancyButton } from "../FancyButton";
import style from "./index.module.css";

export function SimplePage(props) {
    return (
        <div>
            <h1 className={style.heading}>{props.title}</h1>
            <h2 className={style.subtitle}>{props.subtitle}</h2>
            <p className={style.content}>{props.content}</p>
            {props.showButton &&
                <FancyButton onClick={props.onButtonClick} centerOnPage={true}>{props.buttonText}</FancyButton>
            }
            {props.children}
        </div>
    )
}
