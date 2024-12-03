import React from "react";

interface SwitchProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, disabled, label, className }) => {
    return (
        <div className={`form-check form-switch ${className}`}>
            {label && <label className="form-check-label">{label}</label>}
            <input
                type="checkbox"
                className="form-check-input"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default Switch;
