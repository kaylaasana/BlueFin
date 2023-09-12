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
  setScore,
}) => {
  const [countdown, setCountdown] = useState(20);
  const [easyScore] = useMutation(UPDATE_EASY_SCORE);
  const [hardScore] = useMutation(UPDATE_HARD_SCORE);

  // useEffect renders once the Timer component mounts.
  // This will handle the audioStream that's passed from Training

  useEffect(() => {
    currentNote.audioStream();
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer);
        prompt(
          setScore,
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
  }, [countdown]);

  return (
    <>
      <div> Time Left: {countdown}</div>
    </>
  );
};

export default Timer;
