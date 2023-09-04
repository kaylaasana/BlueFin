import audioStream from "../utils/audioStream";
import playNote from "../utils/playNote";

const Training = () => {
  
  const tuner = () => audioStream()
  const note = () => playNote()
 
  return(
  <>                        
    <button onClick={tuner}>Test</button>
    <button onClick={note}>Play This Note</button>
    
    <div id="note" style={{ color: 'white' }}></div>
  </>
  )
}

export default Training