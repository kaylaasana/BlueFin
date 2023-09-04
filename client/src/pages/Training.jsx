import { useEffect, useRef, useState } from "react";
import audioStream from "../utils/audioStream";

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