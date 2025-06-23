import { ConnectWalletModal } from "@/components/modal/ConnectWalletModal";
import { useModal } from "@/contexts/ModalContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

export function useConnectWalletModal() {
  const { openCustom, closeModal } = useModal();
  const { connected } = useWallet();

  const openWalletModal = useCallback((options: {
    showOnlyInstalled?: boolean;
    onSuccess?: () => void;
  } = {}) => {
    if (connected) {
      options.onSuccess?.();
      return;
    }

    const modalId = openCustom({
      component: ({ onClose }) => (
        <ConnectWalletModal
          onClose={onClose}
          onSuccess={() => {
            onClose();
            options.onSuccess?.();
          }}
          showOnlyInstalled={options.showOnlyInstalled}
        />
      ),
    }, {
      size: 'md',
      animation: 'scale',
      backdrop: true,
      closable: true,
    });

    return modalId;
  }, [openCustom, connected]);

  return {
    openWalletModal,
    isConnected: connected,
  };
}