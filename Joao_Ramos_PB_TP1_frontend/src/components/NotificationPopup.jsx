import { useEffect, useState } from "react";
import Card from "./base/Card";
import { COLORS } from "../services/StyleService";
import { ENotificationTypes, useNotification } from "../services/NotificationService";
import InlineButton from "./base/InlineButton";

export default function NotificationPopup(props){
    const messages = useNotification()
    const [show, setShow] = useState(true)
    const DURATION = 10000 // 10s

    const BR = <div style={{width:"90%", borderBottom:`1px solid ${COLORS.bgDim}`}}/>

    const color = 
        props.notification.type == ENotificationTypes.WARNING? COLORS.yellow
        :props.notification.type == ENotificationTypes.ERROR? COLORS.red
        :props.notification.type == ENotificationTypes.INFO? COLORS.blue
        :props.notification.type == ENotificationTypes.SUCCESS? COLORS.green
        : COLORS.bgDim

    useEffect(()=>{
        console.log("Popup criado")
        setTimeout(() => {
            if(show) close()
        }, DURATION);
    }, [])

    const close = () =>{
        setShow(false)
        setTimeout(() => {
            messages.removeNotification(props.notification)
        }, 1000);
    }

    console.log(props.notification)

    return(
        <Card style={getStyle(color, show, props.style)}> 
            <div style={{padding:"0.1rem 1rem"}}>
                <div onClick={close} style={{width:"100%", textAlign:"right"}}>
                    <InlineButton style={{color:COLORS.dim, fontSize:"0.8rem"}}>
                    X
                    </InlineButton>
                </div>
                <span style={{fontSize:"1em"}}>{props.notification.title}</span>
                { props.notification.title? BR: ""}
                <p>
                    <span style={{fontSize:"0.9em"}}>
                        {props.notification.message}
                    </span>
                </p>
            </div>
        </Card>
    )
}

const getStyle = (color, show, style) =>{
    return {
        border: show? `1px solid ${COLORS.bgDim}` : 'none', 
        color:COLORS.txt2, 
        height: show? 'auto' : '0px',
        backgroundColor:color,
        padding: "1rem",
        ...style
    }
}