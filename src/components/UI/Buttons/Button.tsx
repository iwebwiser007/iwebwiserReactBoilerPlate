import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, loading, className, type }) => {
    return (
        <button
            type={type || 'button'}
            className={`btn ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? "Loading..." : text}
        </button>
    );
};

export default Button;
