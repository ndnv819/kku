import 'react-toastify/dist/ReactToastify.css';

import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
