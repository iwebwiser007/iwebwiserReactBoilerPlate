import React from "react";

interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, checked, onChange, label, disabled }) => {
    return (
        <div className="form-check">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-check-input"
                disabled={disabled}
            />
            <label className="form-check-label">{label}</label>
        </div>
    );
};

export default RadioButton;
