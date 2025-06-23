'use client';

import React, { ReactNode, useEffect, useState } from 'react';

interface ModalOverlayProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  backdrop?: boolean;
  zIndex?: number;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  className?: string;
}

export default function ModalOverlay({
  children,
  isOpen,
  onClose,
  backdrop = true,
  zIndex = 1000,
  animation = 'fade',
  className = '',
}: ModalOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && backdrop) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 ${getAnimationClass(animation, isOpen)} ${className}`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

function getAnimationClass(animation: string, isOpen: boolean): string {
  const baseClass = 'transition-all duration-300 ease-out';
  
  switch (animation) {
    case 'fade':
      return `${baseClass} ${isOpen ? 'opacity-100' : 'opacity-0'}`;
    case 'slide':
      return `${baseClass} ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`;
    case 'scale':
      return `${baseClass} ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;
    case 'none':
      return '';
    default:
      return `${baseClass} ${isOpen ? 'opacity-100' : 'opacity-0'}`;
  }
}