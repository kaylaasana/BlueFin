import { useState } from 'react';
import Training from './Training';

import '../Training.css'

const Difficulty = () => {
  const [easy, setEasy] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    console.log(e.target.id);
    if (e.target.id == 'Easy') {
      setEasy(true);
    } else {
      setEasy(false);
    }

    setIsClicked(true);
  };

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
