import styles from './feedback.module.css';

const FeedbackOptions = ({ items, leaveFeedback }) => {
//   const arrItems = Object.keys(items);
  const buttonElements = items.map(item => (
    <button
      className={styles.btn}
      onClick={evt => leaveFeedback(evt)}
      key={item}
      name={item}
    >
      {item}
    </button>
  ));

  return buttonElements;
};

export default FeedbackOptions;