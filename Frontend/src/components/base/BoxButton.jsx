import React from 'react';
import { COLORS } from '../../services/StyleService';

export default function BoxButton(props) {
    const [hover, setHover] = React.useState(false);

    return (
        <button
            onMouseEnter={setHover.bind(this, true)}
            onMouseLeave={setHover.bind(this, false)}
            {...props}
            style={getStyle(props.disabled, hover, props.style)}
        >
            {props.children}
        </button>
    );
}

function getStyle(disabled, hover, customStyle){
    return {
        cursor: "pointer",
        padding: '0.5em 1em',
        borderRadius: '0.5em',
        fontWeight: '800',
        backgroundColor: disabled ? COLORS.dim : hover? COLORS.bg: COLORS.highlight, 
        color: disabled ? COLORS.dim : hover? COLORS.highlight : COLORS.txt2, 
        border: `3px solid ${disabled ? COLORS.dim : COLORS.highlight}`, 
        ...customStyle  
    }
}
