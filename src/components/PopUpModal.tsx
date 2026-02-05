'use client'
import { promises } from "dns";
import React from "react";

export interface PopUpModalType {
  open: boolean;
  title?: string;
  message: string;

  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;

  confirmText?: string;
  cancelText?: string;
}

export default function PopUpModal({
  open,
  title = "Confirmation",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}: PopUpModalType) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 animate-scaleIn">
        
        <h2 className="text-lg font-semibold mb-3">{title}</h2>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();
              onCancel(); // close after action
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}
