import { Note } from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useState } from 'react';

const Training = () => {
  const currentNote = new Note();
  currentNote.confirmNote = [];
  const [playbackNote, setPlaybackNote] = useState();
  const [score, setScore] = useState(0);

  const tuner = () => currentNote.audioStream();
  const note = () => {
    playNote().then((note) => {
      setPlaybackNote(note);
      console.log('Played Note: ', note);
    });
  };

  // create an array that will track noteChecker's inputs up to a certain length
  // once that length is reached, check to see if the array's elements are all the same
  // if they are, user gets a point, else clear the array.
  const noteChecker = () => {
    console.log('Your Note: ', currentNote.noteTracker);
  };

  // can create another variable to keep track of when to stop everything.
  //  let stopCount = 0
  //  something something happens, stopCount ++, when stopCount = some number, stop everything

  return (
    <>
      <button onClick={tuner}>Test</button>
      <button onClick={note}>Play This Note</button>
      <button onClick={noteChecker}>Note Checker</button>

      <div style={{ color: 'white', fontSize: 100 }}>
        Play This Note {playbackNote}
      </div>
      <div style={{ color: 'white', fontSize: 100 }}>Your Score: {score}</div>

      <div id='note' style={{ color: 'white', fontSize: 100 }}></div>
    </>
  );
};

export default Training;
