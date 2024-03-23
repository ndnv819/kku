import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useToast() {
  const showInfo = useCallback((message: string): void => {
    toast.info(message);
  }, []);

  return {
    showInfo,
  };
}
