import React, { useState } from 'react';
import { COLORS } from '../../services/StyleService';


export default function SelectInput(props) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <select
            {...props}
            value={props.value ?? ""}
            onChange={(e) => props.onChange(e)}
            onMouseEnter={() => { setHover(true); props.onMouseEnter && props.onMouseEnter() }}
            onMouseLeave={() => { setHover(false); props.onMouseLeave && props.onMouseLeave() }}
            onFocus={() => { setActive(true); props.onFocus && props.onFocus() }}
            onBlur={() => { setActive(false); props.onBlur && props.onBlur() }}
            style={getStyle(hover, active, props.disabled, props.style)}
        >
            {props.options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    )
}


const getStyle = (hover, active, disable, customStyle) => {
    return {
        backgroundColor: disable? COLORS.softDim : COLORS.bg,
        cursor: disable? 'not-allowed' : 'auto',
        border: "1px solid " + (disable? COLORS.softDim : active ? COLORS.softHighlight : hover ? COLORS.highlight : COLORS.txt),
        borderRadius: '0.5em',
        outline: 'none',
        color: COLORS.txt,
        padding: '0.5em 1em',
        ...customStyle,
    }
}