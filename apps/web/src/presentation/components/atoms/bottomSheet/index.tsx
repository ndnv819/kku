import 'react-responsive-modal/styles.css';

import { useCallback } from 'react';
import { Modal } from 'react-responsive-modal';

import styles from './styles.module.scss';
import type { BottomSheetProps } from './types';

export function BottomSheet({
  isOpen,
  onClose,
  children,
  ...props
}: BottomSheetProps): JSX.Element {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      classNames={{
        modal: styles['bottom-sheet'],
        overlay: styles['bottom-sheet-overlay'],
      }}
      {...props}
    >
      {children}
    </Modal>
  );
}
