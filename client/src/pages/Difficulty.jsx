import { useState } from 'react';
import Training from './Training';
import Swal from 'sweetalert2';

import '../Training.css'

const Difficulty = () => {
  const [easy, setEasy] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {

    if (e.target.id == 'Easy') {
      setEasy(true);
    } else {
      setEasy(false);
    }

    setIsClicked(true);
  };

  const showHowToPlay = () => {
    Swal.fire({
      icon: 'info',
      title: 'How To Play',
      html: '<p>The objective is to train your ears to <b>repeat</b> the note that is being played</p>' +
        '<p>The game will start <b>right after</b> you choose any difficulty!</p>' +
        '<p>In <b>easy mode</b>, you can see the note being played</p>' +
        '<p>In <b>hard mode</b>, you cannot see the note being played</p>' +
        '<p>In order to reach high score, you have to keep listening and playing the note until the time runs out</p>' +
        '<p>After the time runs out, you can save the score or you can try it again</p>'
    })
  }

  return (
    <>
      {!isClicked && (
        <>
          <div className="buttonContainer">
            <button className="coolBtn" id={'Easy'} onClick={handleClick} style={{ '--color': 'blue' }} >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Easy
            </button>
            <button className='coolBtn' onClick={showHowToPlay} style={{ '--color': 'green' }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              How To Play
            </button>
            <button className="coolBtn" id={'Hard'} onClick={handleClick} style={{ '--color': 'red' }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Hard
            </button>
          </div>
        </>
      )}
      {isClicked ? (
        <Training difficulty={easy} setDifficulty={setEasy} />
      ) : null}
    </>
  );
};

export default Difficulty;
