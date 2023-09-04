import { useEffect, useRef, useState } from "react";
import audioStream from "../utils/audioStream";
// import audioStream from "../utils/audioAsyncTesting";

const Training = () => {
  
  const onClick = () => audioStream()
 
  return(
  <>                        
    <button onClick={onClick}>Test</button>
    
    <div id="note" style={{ color: 'white' }}></div>
  </>
  )
}

export default Training