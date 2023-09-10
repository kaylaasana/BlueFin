import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Timer = ({ currentNote, checkNote, interval, score }) => {
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    currentNote.audioStream();
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer);
        // Swal.fire(
        //   {
        //   title: "Time's Up!",
        //   text: `Your final score: ${score}`,
        //   allowOutsideClick: false,
        //   showConfirmButton: true,
        //   confirmButtonText: 'Save Score & Try Again',
        //   showDenyButton: true,
        //   denyButtonText: "Don't Save & Try Again",
        //   showCancelButton: true,
        //   cancelButtonText: "I'd like to practice on my own",
        // });
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
