import { useState } from "react";
import TextInput from "./TextInput";

export default function NumberInput(props) {

    const handleChange = (value) => {
        const numericValue = value.replace(/\D/g, "");
        props.onChange && props.onChange(numericValue);
    };

    return <TextInput {...props} onChange={handleChange} />;
}
