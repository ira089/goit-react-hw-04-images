import styles from './feedback.module.css';

const Statistics = ({ items, values, total, positiveFeedbackPercentage }) => {
  // console.log(items.good);
//   const arrItems = Object.keys(items);
//   console.log(arrItems);
  return (
    <ul className={styles.statisticsList}>
      {items.map(item => (
        <li className={styles.item} key={item}>
          {values[0]}: {item}
        </li>
      ))}
      <li className={styles.item}>Total: {total}</li>
      <li className={styles.item}>
        Positive feedback: {positiveFeedbackPercentage}%
      </li>
    </ul>
  );
};

export default Statistics;