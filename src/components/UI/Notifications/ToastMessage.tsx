import React from "react";

interface ToastMessageProps {
    message: string;
    type: "success" | "error" | "info";
    onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, type, onClose }) => {
    return (
        <div className={`toast align-items-center text-bg-${type}`} role="alert">
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={onClose}></button>
            </div>
        </div>
    );
};

export default ToastMessage;
