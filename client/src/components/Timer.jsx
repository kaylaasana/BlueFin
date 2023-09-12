import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EASY_SCORE, UPDATE_HARD_SCORE } from '../utils/mutation';
import prompt from '../utils/prompt';

const Timer = ({
  currentNote,
  checkNote,
  interval,
  score,
  resetScore,
  difficulty,
  practice,
  setScore,
}) => {
  const [countdown, setCountdown] = useState(3);
  const [easyScore] = useMutation(UPDATE_EASY_SCORE);
  const [hardScore] = useMutation(UPDATE_HARD_SCORE);

  useEffect(() => {
    currentNote.audioStream();

    if (practice == false) {
      const timer = setInterval(() => {
        if (countdown <= 0) {
          clearInterval(timer);
          prompt(
            score,
            setCountdown,
            resetScore,
            easyScore,
            hardScore,
            difficulty,
          );
          return 0;
        } else {
          checkNote(interval);
          setCountdown((countdown) => countdown - 1);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
    setCountdown('Take your time');
    setScore('No Score');
  }, [countdown]);

  return (
    <>
      <div> Timeleft: {countdown}</div>
    </>
  );
};

export default Timer;
