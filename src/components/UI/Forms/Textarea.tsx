import React from "react";

interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    value,
    onChange,
    placeholder,
    rows = 4,
    cols = 50,
    disabled,
    className,
}) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            cols={cols}
            disabled={disabled}
            className={`form-control ${className}`}
        />
    );
};

export default Textarea;
