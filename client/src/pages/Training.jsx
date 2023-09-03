import { useRef } from "react";
import audioStream from "../utils/audioStream";

const Training = () => {
  return(
  <>
    <button onClick={() => audioStream()}>Test</button>
    <canvas className="visualizer"></canvas>
  </>
  )
}

export default Training