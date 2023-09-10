import { Note } from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useEffect, useState } from 'react';

const Training = ({ difficulty, setDifficulty }) => {
  const currentNote = new Note();

  const [playbackNote, setPlaybackNote] = useState(' ');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [interval, setInterval] = useState(null);
  const [count, setCount] = useState(0);

  const checkNote = (interval) => {
    if (playbackNote == currentNote.noteTracker) {
      setScore(score + 1);
      clearInterval(interval);
      console.log('if statement called');
      note();
    }
    console.log('playbackNote: ', playbackNote);
    console.log('currentNote: ', currentNote.noteTracker);
  };

  const tuner = () => currentNote.audioStream();
  const note = () => {
    playNote(playbackNote).then((noted) => {
      setPlaybackNote(noted);
    });
  };

  useEffect(() => {
    note();
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log('are you counting down?');
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    currentNote.audioStream();
    const interval = setInterval(function () {
      setTimer(timer - 1);
      if (timer <= 0) {
        setTimer("Time's Up!");
        clearInterval(interval);
      }
      checkNote(interval);
    }, 1000);
    clearInterval(interval);
  }, [playbackNote]);

  return (
    <>
      {difficulty ? (
        <>
          <button onClick={tuner}>Test</button>
          <button onClick={note}>Play This Note</button>

          <div style={{ color: 'white', fontSize: 100 }}>
            Play This Note {playbackNote}
          </div>
          <div style={{ color: 'white', fontSize: 100 }}>Timeleft: {timer}</div>
          <div style={{ color: 'white', fontSize: 100 }}>
            Your Score: {score}
          </div>

          <div style={{ color: 'white' }}>{count}</div>

          <div id='note' style={{ color: 'white', fontSize: 100 }}></div>
        </>
      ) : (
        <>
          <button onClick={tuner}>Test</button>
          <button onClick={note}>Play This Note</button>

          <div style={{ color: 'white', fontSize: 100 }}>Timeleft: {timer}</div>
          <div style={{ color: 'white', fontSize: 100 }}>
            Your Score: {score}
          </div>

          <div id='note' style={{ color: 'white', fontSize: 100 }}></div>
        </>
      )}
    </>
  );
};
export default Training;
