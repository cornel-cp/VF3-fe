'use client';

import React, { createContext, useContext, useReducer, ReactNode, useCallback, useEffect } from 'react';
import { ModalState, ModalConfig, ModalType, BaseModalProps } from '@/types/modal';
import ModalRenderer from '@/components/modal/ModalRenderer';

interface ModalContextType {
  // State
  modals: ModalState['modals'];
  isLoading: boolean;
  
  // Actions
  openModal: (config: Omit<ModalConfig, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  updateModal: (id: string, updates: Partial<ModalConfig>) => void;
  
  // Convenience methods
  confirm: (data: import('@/types/modal').ConfirmModalData, options?: Partial<BaseModalProps>) => Promise<boolean>;
  alert: (data: import('@/types/modal').AlertModalData, options?: Partial<BaseModalProps>) => Promise<void>;
  openForm: <T>(data: import('@/types/modal').FormModalData<T>, options?: Partial<BaseModalProps>) => Promise<T | null>;
  openCustom: (data: import('@/types/modal').CustomModalData, options?: Partial<BaseModalProps>) => string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal reducer
type ModalAction =
  | { type: 'OPEN_MODAL'; payload: ModalConfig & { id: string } }
  | { type: 'CLOSE_MODAL'; payload: string }
  | { type: 'CLOSE_ALL_MODALS' }
  | { type: 'UPDATE_MODAL'; payload: { id: string; updates: Partial<ModalConfig> } }
  | { type: 'SET_LOADING'; payload: boolean };

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modals: [...state.modals, action.payload],
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: state.modals.filter(modal => modal.id !== action.payload),
      };
    
    case 'CLOSE_ALL_MODALS':
      return {
        ...state,
        modals: [],
      };
    
    case 'UPDATE_MODAL':
      return {
        ...state,
        modals: state.modals.map(modal =>
          modal.id === action.payload.id
            ? { ...modal, ...action.payload.updates }
            : modal
        ),
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    default:
      return state;
  }
};

const initialState: ModalState = {
  modals: [],
  isLoading: false,
};

// Modal Provider Component
interface ModalProviderProps {
  children: ReactNode;
  maxModals?: number;
}

export function ModalProvider({ children, maxModals = 5 }: ModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  // Generate unique ID for modals
  const generateId = useCallback(() => {
    return `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Open modal
  const openModal = useCallback((config: Omit<ModalConfig, 'id'>) => {
    if (state.modals.length >= maxModals) {
      console.warn(`Maximum number of modals (${maxModals}) reached`);
      return '';
    }

    const id = generateId();
    const modalConfig: ModalConfig & { id: string } = {
      id,
      size: 'md',
      closable: true,
      backdrop: true,
      centered: true,
      animation: 'fade',
      ...config,
    };

    dispatch({ type: 'OPEN_MODAL', payload: modalConfig });
    return id;
  }, [state.modals.length, maxModals, generateId]);

  // Close modal
  const closeModal = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_MODAL', payload: id });
  }, []);

  // Close all modals
  const closeAllModals = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL_MODALS' });
  }, []);

  // Update modal
  const updateModal = useCallback((id: string, updates: Partial<ModalConfig>) => {
    dispatch({ type: 'UPDATE_MODAL', payload: { id, updates } });
  }, []);

  // Convenience method: Confirmation modal
  const confirm = useCallback((
    data: import('@/types/modal').ConfirmModalData,
    options?: Partial<import('@/types/modal').BaseModalProps>
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = openModal({
        type: 'confirm',
        data: {
          ...data,
          onConfirm: () => {
            closeModal(id);
            resolve(true);
          },
          onCancel: () => {
            closeModal(id);
            if (data.onCancel) data.onCancel();
            resolve(false);
          },
        },
        ...options,
      });
    });
  }, [openModal, closeModal]);

  // Convenience method: Alert modal
  const alert = useCallback((
    data: import('@/types/modal').AlertModalData,
    options?: Partial<import('@/types/modal').BaseModalProps>
  ): Promise<void> => {
    return new Promise((resolve) => {
      const id = openModal({
        type: 'alert',
        data: {
          ...data,
          onConfirm: () => {
            closeModal(id);
            if (data.onConfirm) data.onConfirm();
            resolve();
          },
        },
        ...options,
      });
    });
  }, [openModal, closeModal]);

  // Convenience method: Form modal
  const openForm = useCallback(<T,>(
    data: import('@/types/modal').FormModalData<T>,
    options?: Partial<import('@/types/modal').BaseModalProps>
  ): Promise<T | null> => {
    return new Promise((resolve) => {
      const id = openModal({
        type: 'form',
        data: {
          ...data,
          onSubmit: async (formData: T) => {
            try {
              await data.onSubmit(formData);
              closeModal(id);
              resolve(formData);
            } catch (error) {
              console.error('Form submission error:', error);
              // Keep modal open on error
            }
          },
        },
        onClose: () => {
          closeModal(id);
          resolve(null);
        },
        ...options,
      });
    });
  }, [openModal, closeModal]);

  // Convenience method: Custom modal
  const openCustom = useCallback((
    data: import('@/types/modal').CustomModalData,
    options?: Partial<import('@/types/modal').BaseModalProps>
  ): string => {
    return openModal({
      type: 'custom',
      data,
      ...options,
    });
  }, [openModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.modals.length > 0) {
        const topModal = state.modals[state.modals.length - 1];
        if (topModal.closable !== false) {
          closeModal(topModal.id);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [state.modals, closeModal]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (state.modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [state.modals.length]);

  const contextValue: ModalContextType = {
    modals: state.modals,
    isLoading: state.isLoading,
    openModal,
    closeModal,
    closeAllModals,
    updateModal,
    confirm,
    alert,
    openForm,
    openCustom,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalRenderer modals={state.modals} closeModal={closeModal} />
    </ModalContext.Provider>
  );
}

// Custom hook to use modal context
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}