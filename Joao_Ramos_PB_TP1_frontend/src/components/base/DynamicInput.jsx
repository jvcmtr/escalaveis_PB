import React, { useState } from "react";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import { COLORS } from "../../services/StyleService";
import TextBox from "./TextBox";

export default function DynamicInput(props){
    const [val, setVal] = useState(props.value)

    const label = (input) => {
        return (
            <div style={{display:"flex", flexDirection:"column", margin:"1.5rem"}}>
                <label style={{fontWeight:"600", color: COLORS.dim}}>{props.field.name}</label>
                {input}
            </div>
        )
    }

    const inputProps = {
        value: props.value ?? "",
        onChange : (e) => {setVal(e.target.value); props.onChange(e.target.value)},
        options: props.options || props.field.options || [],
        disabled: props.disabled || !props.field.editable,
        value : val
    }

    if (props.field.type == "text") {
        return label(<TextBox {...inputProps}/>)
    }
    if (props.field.type == "enum") {
        return label(<SelectInput {...inputProps}/>)
    }
    if (props.field.type == "datetime") {
        return label(<DateInput {...inputProps}/>)
    }
    if (props.field.type == "number") {
        return label(<NumberInput {...inputProps}/>)
    }

    return label(<TextInput {...inputProps}/>)
};
