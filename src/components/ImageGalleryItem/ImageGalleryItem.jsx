import {useState } from 'react';
import Modal from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem =({item}) => {
  const [modalOpen, setModalOpen]= useState(false)
 
  const showModal = () => {
    setModalOpen(true)
  };

  const closeModal = () => {
    setModalOpen(false)
  };
  
    const { id, url, tags, urlModal } = item;
    
    return (
      <>
        <li
          key={id}
          className={styles.imageGalleryItem}
          onClick={showModal}
        >
          <img className={styles.imageGalleryItemImage} src={url} alt={tags} />
        </li>
        {modalOpen && (
          <Modal urlModal={urlModal} close={closeModal} alt={tags} />
        )}
      </>
    );
  
}

export default ImageGalleryItem;