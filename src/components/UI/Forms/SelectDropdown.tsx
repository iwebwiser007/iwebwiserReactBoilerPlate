import React, { ChangeEvent } from "react";

interface SelectDropdownProps {
    options: string[];
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    name?: string;
    disabled?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
    options,
    value,
    onChange,
    label,
    name,
    disabled
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                className="form-control"
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectDropdown;
