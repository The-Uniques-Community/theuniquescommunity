/**
 * @file Community.jsx
 * @description General-purpose backdrop overlay modal dialog component with title and close dismissal button.
 * @architecture Reusable modal primitive in src/utils/Modal/ providing container layout for community dialogs and prompts.
 * @agent_note Conditionally returns null when `isOpen` is falsy. Backdrop click does not automatically close; close is triggered by close button.
 */

import React from 'react';

/**
 * @component Modal
 * @description Renders a centered modal dialog box with header title, close SVG icon button, and child content.
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Controls visibility of the modal
 * @param {Function} props.onClose - Callback triggered when the close button is clicked
 * @param {string} props.title - Modal title text
 * @param {React.ReactNode} props.content - Body content or components rendered within modal
 * @state None
 * @api None
 */
const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-[#212B36]">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="text-[#383838]">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Modal;
