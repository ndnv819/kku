import type { ReactNode } from 'react';
import type { ModalProps } from 'react-responsive-modal';

export interface BottomSheetProps extends Omit<ModalProps, 'open' | 'onClose'> {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}
