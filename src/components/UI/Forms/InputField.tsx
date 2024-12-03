import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
    register: UseFormRegisterReturn;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    register,
    placeholder,
    type = "text",
    disabled,
    label,
    name,
    className,
}) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                {...register}
                type={type}
                className={`form-control ${className}`}
                placeholder={placeholder}
                disabled={disabled}
                id={name}
            />
        </div>
    );
};

export default InputField;
