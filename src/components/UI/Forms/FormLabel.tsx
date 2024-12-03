import React from "react";

interface FormLabelProps {
    htmlFor: string;
    children: React.ReactNode;
    className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children, className }) => {
    return (
        <label htmlFor={htmlFor} className={`form-label ${className}`}>
            {children}
        </label>
    );
};

export default FormLabel;
