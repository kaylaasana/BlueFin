import { useRef } from "react";
// import startPitchDetect from "../utils/pitchdetect";


const TrainingRoom = () => {
  return(
  <>
    
    <button onClick={() => startPitchDetect()}>Test</button>
    <canvas className="visualizer"></canvas>
  </>
  )
}

export default TrainingRoom