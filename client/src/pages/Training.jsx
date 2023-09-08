import { Note } from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useEffect, useState } from 'react';

const Training = () => {
  const currentNote = new Note();
  const [playbackNote, setPlaybackNote] = useState();
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);

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
    currentNote.audioStream();

    let time = 0;
    const interval = setInterval(function () {
      time++;
      if (time >= 10) {
        console.log("time's up");
        clearInterval(interval);
      }
      checkNote(interval);
    }, 1000);
  }, [playbackNote]);

  return (
    <>
      <button onClick={tuner}>Test</button>
      <button onClick={note}>Play This Note</button>
      {/* <button onClick={testInterval}>Testing Interval, sort of</button> */}

      <div style={{ color: 'white', fontSize: 100 }}>
        Play This Note {playbackNote}
      </div>
      <div style={{ color: 'white', fontSize: 100 }}>Timeleft: {timer}</div>
      <div style={{ color: 'white', fontSize: 100 }}>Your Score: {score}</div>

      <div id='note' style={{ color: 'white', fontSize: 100 }}></div>
    </>
  );
};

export default Training;
