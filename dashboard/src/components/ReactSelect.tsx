import React from 'react'
import Select from "react-select";

export default function ReactSelect({ controllerField, field }: any) {
    return (
        <Select
            {...controllerField}
            isMulti={field.isMulti}
            options={field.options}
            onChange={(selected) => controllerField.onChange(selected)}
            value={controllerField.value}
        />
    )
}
