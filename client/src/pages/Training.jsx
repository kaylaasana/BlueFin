import audioStream from "../utils/audioStream";
import playNote from "../utils/playNote";
import { useState } from "react";

const Training = () => {
  const [playbackNote, setPlaybackNote] = useState("testing")
  
  console.log()
  const tuner = () => audioStream()
  const note = () => {
    playNote()
  }
    console.log(playNote())
  return(
  <>                        
    <button onClick={tuner}>Test</button>
    <button onClick={note}>Play This Note</button>
    <div>Play This Note {playbackNote}</div>
    
    <div id="note" style={{ color: 'white' }}></div>
  </>
  )
}

export default Training