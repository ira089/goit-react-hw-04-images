import styles from './feedback.module.css';
const Notification = ({ message }) => {
  return <p className={styles.item}>{message}</p>;
};

export default Notification;