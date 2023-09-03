import { useRef } from "react";
import audioStream from "../utils/pitchdetect";

const Training = () => {
  return(
  <>
    <button onClick={() => audioStream()}>Test</button>
    <canvas className="visualizer"></canvas>
  </>
  )
}

export default Training