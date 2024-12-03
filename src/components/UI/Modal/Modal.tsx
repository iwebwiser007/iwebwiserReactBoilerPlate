import React from "react";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: "sm" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children, size = "lg" }) => {
    if (!show) return null;
    return (
        <div className="modal show" style={{ display: "block" }} tabIndex={-1}>
            <div className={`modal-dialog modal-${size}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
