import 'react-toastify/dist/ReactToastify.css';

import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        rtl={false}
        closeOnClick
        closeButton={false}
        theme="dark"
      />
    </>
  );
}
