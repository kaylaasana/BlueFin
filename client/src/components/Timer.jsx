import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EASY_SCORE, UPDATE_HARD_SCORE } from '../utils/mutation';
import prompt from '../utils/prompt';

const Timer = ({ currentNote, checkNote, interval, score, resetScore }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    currentNote.audioStream();
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer);
        prompt(score, setCountdown, resetScore);
        return 0;
      } else {
        checkNote(interval);
        setCountdown((countdown) => countdown - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <>
      <div> Timeleft: {countdown}</div>
    </>
  );
};

export default Timer;
