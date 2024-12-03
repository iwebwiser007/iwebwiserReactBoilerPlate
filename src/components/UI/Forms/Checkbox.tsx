import React, { ChangeEvent } from "react";

interface CheckboxProps {
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                checked={checked}
                onChange={onChange}
            />
            <label className="form-check-label">{label}</label>
        </div>
    );
};

export default Checkbox;
