'use client';

import React from 'react';
import { CustomModalData } from '@/types/modal';

interface CustomModalProps {
  data: CustomModalData;
  onClose: () => void;
}

export default function CustomModal({ data, onClose }: CustomModalProps) {
  const CustomComponent = data.component;

  return (
    <CustomComponent
      onClose={onClose}
      data={data.data}
    />
  );
}