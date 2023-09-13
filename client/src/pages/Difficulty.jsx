import { useState } from 'react';
import Training from './Training';

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
        </>
      )}
      {isClicked ? (
        <Training difficulty={easy} setDifficulty={setEasy} />
      ) : null}
    </>
  );
};

export default Difficulty;
