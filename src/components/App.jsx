
import { useState } from "react";
// import { Component } from 'react';
import styles from './Feedback/feedback.module.css';
import Section from './Feedback/Section';
import Notification from './Feedback/Notification';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Statistics from './Feedback/Statistics';

// const arrItems = ['good','neutral', 'bad']

const App =()=> {
  
// const [good, setGood]= useState(0)
// const [neutral, setNeutral]= useState(0)
// const [bad, setBad]= useState(0)

// const arrValues = [good, neutral,bad]
const [options, setOptions] = useState({
  good: 0,
  neutral: 0,
  bad: 0,
})
console.log(options)

const arrItems = Object.keys(options)
console.log(arrItems)

const arrValues = Object.values(options);
console.log(arrValues)

  const leaveFeedback = ev => {
    
    const counterStatItem = ev.target.name;
    console.log(counterStatItem)
    setOptions(prevOptions => ({
      ...prevOptions,
      [counterStatItem]: prevOptions[counterStatItem] + 1
    }))
    // switch(counterStatItem) {
    //   case 'good':
    //     setGood(prevGood=> prevGood + 1)
    //     break;
    //     case 'neutral':
    //       setNeutral(prevNeutral => prevNeutral + 1)
    //       break;
    //       case 'bad':
    //         setBad(prefBad => prefBad + 1)
    //         break;
    //       default:
    //         return;
    // }

    
  };

  const countTotalFeedback = () =>{
    // const statValues = Object.values(this.state);
    // console.log(statValues);
    // const statValues = [good, neutral,bad]
    const totalStat = arrValues.reduce((total, value) => total + value, 0);
    return totalStat;
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    if (!total) {
      return 0;
    }
    const positiveFeedback = options.good;
    console.log(positiveFeedback);
    return Number(((positiveFeedback / total) * 100).toFixed(2));
  }

  // const values = Object.values(book);

  const nofeedback = () => {
    // const valuesArr = Object.values(this.state);
    // const statValues = [good, neutral,bad]
    // console.log(valuesArr);
    const positiveValues = arrValues.filter(value => value > 0);
    // console.log(positiveValues);
    return positiveValues.length;
  }

  
    const totalStatistic = countTotalFeedback();
    const positiveFeedbackPercentage = countPositiveFeedbackPercentage();

    return (
      <div className={styles.wrap}>
        <Section title="Please leave feedback">
          <div className={styles.blockBtn}>
            <FeedbackOptions
              values={arrValues} items={arrItems}
              leaveFeedback={leaveFeedback}
            />
          </div>
        </Section>
        {nofeedback() ? (
          <Section title="Statistics">
            <Statistics
              items={arrItems} values={arrValues}
              total={totalStatistic}
              positiveFeedbackPercentage={positiveFeedbackPercentage}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </div>
    );
  
}
export default App;