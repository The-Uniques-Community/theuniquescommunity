/**
 * @file ConfirmationModal.jsx
 * @description React Portal based confirmation dialog for destructive or critical actions (e.g., deletion, state toggling).
 * @architecture Reusable utility dialog in src/utils/Modal/ rendering via `createPortal` into `document.body` with ultra-high z-index (`z-[10000000]`).
 * @agent_note Portals to `document.body`. Ensures modal escapes any stacking context or overflow clipping in ancestor elements.
 */

import React from "react";
import { createPortal } from "react-dom";

/**
 * @component ConfirmationModal
 * @description Renders a modal dialog confirming an action with Cancel and Confirm buttons.
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Whether the confirmation dialog is currently visible
 * @param {Function} props.onClose - Callback triggered on dismissal or 'Cancel'
 * @param {Function} props.onConfirm - Callback executed when user affirms action via 'Confirm'
 * @param {string} props.message - Descriptive text prompt explaining the action requiring confirmation
 * @state None
 * @api None
 */
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[10000000] flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{message}</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
