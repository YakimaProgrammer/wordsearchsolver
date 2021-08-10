import style from "./index.module.css";

export function FancyButton(props) {
    return (
        <button onClick={props.onClick} className={
            style.fancyButton 
            + " " + (props.centerOnPage ? style.centerOnPage : "")
            + " " + props.className
        }>{props.children}</button>
    )
}
