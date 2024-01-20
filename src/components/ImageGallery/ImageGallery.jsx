import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ items }) => {
  const elements = items.map(item => (
    <ImageGalleryItem item={item} key={item.id} />
  ));
  return <ul className={styles.imageGallery}>{elements}</ul>;
};

export default ImageGallery;