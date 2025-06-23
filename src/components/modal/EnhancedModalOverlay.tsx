"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { Container } from "../ui";

interface EnhancedModalOverlayProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
  backdrop?: boolean;
  zIndex?: number;
  animation?: "fade" | "slide" | "scale" | "none";
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export default function EnhancedModalOverlay({
  children,
  isOpen,
  onClose,
  modalId,
  backdrop = true,
  zIndex = 1000,
  animation = "fade",
  className = "",
  ariaLabel,
  ariaDescribedBy,
}: EnhancedModalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Store and restore focus
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal container
      setTimeout(() => {
        overlayRef.current?.focus();
      }, 100);
    } else {
      // Restore focus when modal closes
      setTimeout(() => {
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      }, 100);
    }

    return () => {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  // Announce modal to screen readers
  useEffect(() => {
    if (isOpen) {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Modal opened: ${ariaLabel || "Dialog"}`;
      document.body.appendChild(announcement);

      return () => {
        document.body.removeChild(announcement);
      };
    }
  }, [isOpen, ariaLabel]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && backdrop) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      data-modal-id={modalId}
      className={`fixed inset-0 flex items-center justify-center p-4 ${getAnimationClass(
        animation,
        isOpen
      )} ${className}`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative flex justify-center z-10 w-full" role="document">
        {children}
      </div>
    </div>
  );
}

function getAnimationClass(animation: string, isOpen: boolean): string {
  const baseClass = "transition-all duration-300 ease-out";

  switch (animation) {
    case "fade":
      return `${baseClass} ${isOpen ? "opacity-100" : "opacity-0"}`;
    case "slide":
      return `${baseClass} ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`;
    case "scale":
      return `${baseClass} ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`;
    case "none":
      return "";
    default:
      return `${baseClass} ${isOpen ? "opacity-100" : "opacity-0"}`;
  }
}
