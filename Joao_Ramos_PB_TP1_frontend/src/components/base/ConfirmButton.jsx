import BoxButton from "./BoxButton";

export default function ConfirmButton(props){
    
    const confirm = async (ev) => {
        const message = props.message || "Esta ação nescessita confirmação."
        const confirmed = window.confirm(message);

        if (confirmed && props.onClick) {
            props.onClick(ev)
        }
    };

    return <BoxButton onClick={confirm} style={{...props.style}}> {props.children} </BoxButton>

}