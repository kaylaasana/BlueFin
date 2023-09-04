import { useEffect, useRef, useState } from "react";
import audioStream from "../utils/audioStream";

const Training = () => {
  const[note, setNote] = useState()

  return(
  <>
    <button onClick={() => audioStream()}>Test</button>
    <div>{note}</div>
  </>
  )
}

export default Training