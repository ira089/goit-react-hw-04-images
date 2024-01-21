import {  useEffect } from 'react';
import styles from './Modal.module.css';

const Modal =({urlModal, close, alt}) => {

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

useEffect(()=>{
  console.log('modal')
  document.addEventListener('keydown', closeModal);
  return()=>{
    document.removeEventListener('keydown', closeModal);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

    return (
      <div onClick={closeModal} className={styles.overlay}>
        <div className={styles.modal}>
          <img src={urlModal} alt={alt} />
        </div>
      </div>
    );
  
}

export default Modal;
