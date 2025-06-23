'use client';

import React from 'react';
import { AlertModalData } from '@/types/modal';

interface AlertModalProps {
  data: AlertModalData;
  onClose: () => void;
  title?: string;
}

export default function AlertModal({ data, onClose, title }: AlertModalProps) {
  const handleConfirm = () => {
    if (data.onConfirm) {
      data.onConfirm();
    } else {
      onClose();
    }
  };

  const getVariantStyles = () => {
    switch (data.variant) {
      case 'success':
        return {
          icon: '✅',
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      case 'error':
        return {
          icon: '❌',
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      case 'warning':
        return {
          icon: '⚠️',
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      case 'info':
        return {
          icon: 'ℹ️',
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
        };
      default:
        return {
          icon: 'ℹ️',
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
      <div className="p-6">
        <div className={`rounded-lg p-4 mb-4 border ${styles.bgColor} ${styles.borderColor}`}>
          <div className="flex items-center">
            <div className={`text-2xl mr-3 ${styles.iconColor}`}>
              {styles.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {title || data.title}
              </h3>
              <p className="text-gray-600 mt-1">
                {data.message}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {data.confirmText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}