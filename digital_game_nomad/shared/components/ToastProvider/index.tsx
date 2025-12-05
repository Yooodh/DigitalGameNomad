'use client';

// package
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// slice
import styles from './ToastProvider.module.scss';

export default function ToastProvider() {
  return (
    <ToastContainer
      className={styles.toastTheme}
      position='top-center'
      autoClose={2500}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
