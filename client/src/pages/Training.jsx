import audioStream from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useState } from 'react';

const Training = () => {
  const [playbackNote, setPlaybackNote] = useState();

  const tuner = () => audioStream();
  const note = () => {
    playNote().then((note) => {
      setPlaybackNote(note);
    });
  };
 
  return (
    <>
      <button onClick={tuner}>Test</button>
      <button onClick={note}>Play This Note</button>
      <div style={{ color: 'white' }}>Play This Note {playbackNote}</div>

      <div id='note' style={{ color: 'white' }}></div>
    </>
  );
};

export default Training;
