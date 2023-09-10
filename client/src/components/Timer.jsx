import { useState, useEffect } from 'react';

const Timer = ({ currentNote, checkNote, interval }) => {
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    currentNote.audioStream();
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer);
        return 0;
      } else {
        checkNote(interval);
        setCountdown((countdown) => countdown - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return <div> Timeleft: {countdown}</div>;
};

export default Timer;
