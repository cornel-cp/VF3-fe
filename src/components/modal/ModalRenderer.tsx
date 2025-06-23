'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { ModalConfig } from '@/types/modal';
import AlertModal from './AlerModal';
import CustomModal from './CustomModal';
import ConfirmModal from './ConfirmModal';
import EnhancedModalOverlay from './EnhancedModalOverlay';

interface ModalRendererProps {
  modals: Array<ModalConfig & { id: string }>;
  closeModal: (id: string) => void;
}

export default function ModalRenderer({ modals, closeModal }: ModalRendererProps) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      {modals.map((modal, index) => {
        const zIndex = 1000 + index * 10;

        return (
          <EnhancedModalOverlay
            key={modal.id}
            modalId={modal.id}
            isOpen={true}
            onClose={() => closeModal(modal.id)}
            backdrop={modal.backdrop}
            zIndex={zIndex}
            animation={modal.animation}
            className={modal.overlayClassName}
          >
            <div className={`modal-content ${getSizeClass(modal.size)} ${modal.className || ''}`}>
              {modal.type === 'confirm' && (
                <ConfirmModal
                  data={modal.data as any}
                  onClose={() => closeModal(modal.id)}
                  title={modal.title}
                />
              )}
              {modal.type === 'alert' && (
                <AlertModal
                  data={modal.data as any}
                  onClose={() => closeModal(modal.id)}
                  title={modal.title}
                />
              )}
              {modal.type === 'custom' && (
                <CustomModal
                  data={modal.data as any}
                  onClose={() => closeModal(modal.id)}
                />
              )}
            </div>
          </EnhancedModalOverlay>
        );
      })}
    </>,
    document.body
  );
}

function getSizeClass(size?: string): string {
  switch (size) {
    case 'sm': return 'max-w-sm';
    case 'md': return 'max-w-md';
    case 'lg': return 'max-w-lg';
    case 'xl': return 'max-w-xl';
    case 'full': return 'max-w-full';
    default: return 'max-w-md';
  }
}