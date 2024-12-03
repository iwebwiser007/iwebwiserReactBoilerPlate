import React from "react";

interface ErrorMessageProps {
    message?: string;
    className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
    if (!message) return null;
    return <span className={`text-danger ${className}`}>{message}</span>;
};

export default ErrorMessage;
