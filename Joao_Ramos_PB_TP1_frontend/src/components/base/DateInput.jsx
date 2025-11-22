import { useState } from "react";
import TextInput from "./TextInput";
import { COLORS } from "../../services/StyleService";

export default function DateInput(props) {
    const [value, setValue] = useState("");
    const [invalid, setInvalid] = useState(false);

    const formatValue = (value) => {
        if (value.length <= 2) {
            return value;
        }

        if (value.length <= 4) {
            return `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        return `${numericValue.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    };

    const handleChange = (newValue) => {

        let numeric = newValue.replace("/", "");
        validDate = isValidDate(numeric)

        const formatted = formatValue(numeric);
        setValue(formatted);

        if(validDate === false){
            props.onChange && props.onChange(null);
            return
        }
        
        props.onChange && props.onChange(validDate);
        setInvalid(false);
    }

    const handleBlur = (newValue) => {

        let numeric = newValue.replace("/", "");
        validDate = isValidDate(numeric)

        if(validDate === false){
            props.onChange && props.onChange(null);
            setInvalid(true);
            return
        }
        
        props.onChange && props.onChange(validDate);
        setInvalid(false);
    }

    return (
        <TextInput
            {...props}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
                borderColor: invalid && !props.disabled ? COLORS.red: COLORS.softDim,
                ...props.style,
            }}
        />
    );
}


function isValidDate(numeric) {
    if (numeric.length < 8){
        return false
    }
    const d = parseInt(numeric.slice(0, 2));
    const m = parseInt(numeric.slice(2, 4));
    const y = parseInt(numeric.slice(4, 8));

    const date = new Date(year, month - 1, day)
    return date
};
