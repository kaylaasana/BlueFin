import { Note } from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useState } from 'react';

const Training = () => {
  const currentNote = new Note();
  const [playbackNote, setPlaybackNote] = useState();
  const [isMatch, setMatch] = useState(false)

  const tuner = () => currentNote.audioStream();
  const note = () => {
    playNote().then((note) => {
      setPlaybackNote(note);
    });
  };

  const noteChecker = () => {
    console.log(currentNote.noteTracker);
  };

  return (
    <>
      <button onClick={tuner}>Test</button>
      <button onClick={note}>Play This Note</button>
      <button onClick={noteChecker}>Note Checker</button>

      <div style={{ color: 'white', fontSize: 100 }}>
        Play This Note {playbackNote}
      </div>

      <div id='note' style={{ color: 'white', fontSize: 100 }}></div>
    </>
  );
};

export default Training;
