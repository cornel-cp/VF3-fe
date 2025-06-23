'use client';

import React, { useState } from 'react';
import { ConfirmModalData } from '@/types/modal';

interface ConfirmModalProps {
  data: ConfirmModalData;
  onClose: () => void;
  title?: string;
}

export default function ConfirmModal({ data, onClose, title }: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await data.onConfirm();
    } catch (error) {
      console.error('Confirm action error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (data.onCancel) {
      data.onCancel();
    } else {
      onClose();
    }
  };

  const getVariantStyles = () => {
    switch (data.variant) {
      case 'danger':
        return {
          icon: '⚠️',
          iconColor: 'text-red-600',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
        };
      case 'warning':
        return {
          icon: '⚠️',
          iconColor: 'text-yellow-600',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        };
      case 'info':
        return {
          icon: 'ℹ️',
          iconColor: 'text-blue-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
        };
      default:
        return {
          icon: '❓',
          iconColor: 'text-gray-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`text-2xl mr-3 ${styles.iconColor}`}>
            {styles.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title || data.title}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          {data.message}
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            {data.cancelText || 'Cancel'}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded disabled:opacity-50 ${styles.confirmButton}`}
          >
            {isLoading ? 'Loading...' : (data.confirmText || 'Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}