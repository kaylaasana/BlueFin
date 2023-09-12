import { useState } from 'react';
import Training from './Training';

const Difficulty = () => {
  const [easy, setEasy] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [practice, setPractice] = useState(false);

  const handleClick = (e) => {
    console.log(e.target.id);
    if (e.target.id == 'Easy') {
      setEasy(true);
    } else {
      setEasy(false);
    }

    if (e.target.id == 'None') {
      setPractice(true);
    }

    setIsClicked(true);
  };

  return (
    <>
      {!isClicked && (
        <>
          <button id={'Easy'} onClick={handleClick}>
            Easy
          </button>
          <button id={'Hard'} onClick={handleClick}>
            Hard
          </button>
          <button id={'None'} onClick={handleClick}>
            Practice
          </button>
        </>
      )}
      {isClicked ? (
        <Training
          difficulty={easy}
          setDifficulty={setEasy}
          practice={practice}
        />
      ) : null}
    </>
  );
};

export default Difficulty;
