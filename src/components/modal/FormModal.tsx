'use client';

import React from 'react';
import { FormModalData } from '@/types/modal';

interface FormModalProps {
  data: FormModalData;
  onClose: () => void;
  title?: string;
}

export default function FormModal({ data, onClose, title }: FormModalProps) {
  const FormComponent = data.component;

  const handleSubmit = async (formData: any) => {
    try {
      await data.onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error; // Re-throw to keep modal open
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {title || data.title}
        </h3>
      </div>
      
      <div className="p-6">
        <FormComponent
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={data.initialData}
        />
      </div>
    </div>
  );
}