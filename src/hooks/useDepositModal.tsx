import { DepositModal } from '@/components/modal/DepositModal';
import { useModal } from '@/contexts/ModalContext';
import { useCallback } from 'react';

export const useDepositModal = () => {
  const { openCustom } = useModal();

  const openDepositModal = useCallback(() => {
    const modalId = openCustom({
      component: ({ onClose }) => (
        <DepositModal onClose={onClose} />
      ),
    }, {
      size: 'md',
      animation: 'scale',
      backdrop: true,
      closable: true,
    });

    return modalId;
  }, [openCustom]);

  return {
    openDepositModal,
  };
};