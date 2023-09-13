import { Note } from '../utils/audioStream';
import playNote from '../utils/playNote';
import { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import { useQuery } from '@apollo/client';
import { GET_USER_SCORES } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

import '../game.css'

const Training = ({ difficulty }) => {
  const currentNote = new Note();

  const { data } = Auth.getUser();
  const id = data?._id;
  const { data: userScore, loading } = useQuery(GET_USER_SCORES, {
    variables: {
      userId: id,
    },
  });

  const [playbackNote, setPlaybackNote] = useState(' ');
  const [score, setScore] = useState(0);
  const [interval, setInterval] = useState(null);

  const checkNote = (interval) => {
    if (playbackNote == currentNote.noteTracker) {
      setScore(score + 1);
      clearInterval(interval);
      note();
    }
  };

  const resetScore = () => {
    setScore(0);
    note()
  };

  const note = () => {
    playNote(playbackNote).then((noted) => {
      setPlaybackNote(noted);
    });
  };

  useEffect(() => {
    note();
  }, []);

  return (
    <>
      <Link to='/' className='homepage-button'>
        Homepage
      </Link>
      <Link to='/profile' className='logout-button'>
        Profile
      </Link>
      <Link onClick={Auth.logout} className='logout-button'>
        Log Out
      </Link>

      <button onClick={note} className='go logout-button'>
        Play Different Note
      </button>

      <div className='center'>
        {difficulty ? <div className='mx-3 coolNeon' style={{ color: 'white', fontSize: 50 }}>
          Play This Note {playbackNote}
        </div> : null}

        <div className='mx-3 coolNeon-red' style={{ color: 'white', fontSize: 50 }}>
          <Timer
            currentNote={currentNote}
            checkNote={checkNote}
            interval={interval}
            score={score}
            resetScore={resetScore}
            difficulty={difficulty}
            setScore={setScore}
            playbackNote={playbackNote}
          />
        </div>
        <div className='mx-3 coolNeon' style={{ color: 'white', fontSize: 50 }}>
          Your Score: {score}
        </div>
        {difficulty ? <div className='mx-3 coolNeon-red' style={{ color: 'white', fontSize: 50 }}>
          Your Previous Score: {!loading && userScore.getUser.easyScore}
        </div> : <div className='mx-3 coolNeon-red' style={{ color: 'white', fontSize: 50 }}>
          Your Previous Score: {!loading && userScore.getUser.hardScore}
        </div>}

        <div className='mx-3 coolNeon' id='note' style={{ color: 'white', fontSize: 50 }}></div>
      </div>
    </>
  );
};

export default Training;
