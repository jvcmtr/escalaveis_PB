import React from 'react'
import { COLORS } from '../../services/StyleService'

export default function InlineButton(props) {
    const [hover, setHover] = React.useState(false);

    return (
        <span
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
            {...props}
            style={getStyle(hover, props.style)}
        >
            {props.children}
        </span>
    );
}

function getStyle(hover, customStyle){
    return {
        cursor: "pointer",
        padding: '0.2em',
        borderRadius: '0.1em',
        backgroundColor: hover? COLORS.softDim : "transparent", 
        color: COLORS.highlight, 
        textDecoration: hover? 'underline' : 'None', 
        border: 'none',
        ...customStyle  
    }
}
