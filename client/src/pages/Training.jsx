import { Note } from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '../utils/queries';
import Auth from '../utils/auth';
import visualizer from '../utils/visualizer';

const Training = ({ difficulty, practice }) => {
  const currentNote = new Note();

  const { data } = Auth.getUser();
  const id = data?._id;
  // const { data: userScore } = useQuery(GET_USER_DATA);

  const [playbackNote, setPlaybackNote] = useState(' ');
  const [score, setScore] = useState(0);
  const [interval, setInterval] = useState(null);
  // const []

  const checkNote = (interval) => {
    if (playbackNote == currentNote.noteTracker) {
      setScore(score + 1);
      clearInterval(interval);
      note();
    }
  };

  const resetScore = () => {
    setScore(0);
  };

  const tuner = () => currentNote.audioStream();
  const note = () => {
    playNote(playbackNote).then((noted) => {
      setPlaybackNote(noted);
    });
  };

  useEffect(() => {
    note();
    // visualizer();
  }, []);

  return (
    <>
      {difficulty ? (
        <>
          <button onClick={note}>Play This Note</button>

          <div style={{ color: 'white', fontSize: 100 }}>
            Play This Note {playbackNote}
          </div>
          <div style={{ color: 'white', fontSize: 100 }}>
            <Timer
              currentNote={currentNote}
              checkNote={checkNote}
              interval={interval}
              score={score}
              resetScore={resetScore}
              difficulty={difficulty}
              practice={practice}
              setScore={setScore}
              playbackNote={playbackNote}
            />
          </div>
          <div style={{ color: 'white', fontSize: 100 }}>
            Your Score: {score}
          </div>

          <div id='visual'></div>

          <div id='note' style={{ color: 'white', fontSize: 100 }}></div>
        </>
      ) : (
        <>
          <button onClick={note}>Play This Note</button>

          <div style={{ color: 'white', fontSize: 100 }}>
            <Timer
              currentNote={currentNote}
              checkNote={checkNote}
              interval={interval}
              score={score}
              resetScore={resetScore}
              difficulty={difficulty}
              practice={practice}
              setScore={setScore}
            />
          </div>
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
