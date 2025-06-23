export interface BaseModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  backdrop?: boolean;
  centered?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  className?: string;
  overlayClassName?: string;
}

export interface ConfirmModalData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger' | 'warning' | 'info';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface AlertModalData {
  title: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  confirmText?: string;
  onConfirm?: () => void;
}

export interface FormModalData<T = any> {
  title: string;
  component: React.ComponentType<{
    onSubmit: (data: T) => void | Promise<void>;
    onCancel: () => void;
    initialData?: T;
  }>;
  initialData?: T;
  onSubmit: (data: T) => void | Promise<void>;
}

export interface CustomModalData {
  component: React.ComponentType<{ onClose: () => void; data?: any }>;
  data?: any;
}

export type ModalType = 'confirm' | 'alert' | 'form' | 'custom';

export interface ModalConfig extends Partial<BaseModalProps> {
  type: ModalType;
  data: ConfirmModalData | AlertModalData | FormModalData | CustomModalData;
}

export interface ModalState {
  modals: Array<ModalConfig & { id: string }>;
  isLoading: boolean;
}