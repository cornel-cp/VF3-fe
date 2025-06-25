import { WithdrawModal } from '@/components/modal/WithdrawModal';
import { useModal } from '@/contexts/ModalContext';
import { useCallback } from 'react';

export const useWithdrawModal = () => {
  const { openCustom } = useModal();

  const openWithdrawModal = useCallback(() => {
    const modalId = openCustom({
      component: ({ onClose }) => (
        <WithdrawModal onClose={onClose} />
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
    openWithdrawModal,
  };
};